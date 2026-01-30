"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { uploadFileToBlobApi } from "@/lib/uploadWithProgress";

type ExistingDoc = {
  id: string;
  propertyId: string;
  name: string | null;
  url: string;
  pathname?: string | null;
  type: string | null;
  size: string | null;
  uploadedAt: string | Date | null;
};

type QueueItemStatus = "queued" | "uploading" | "done" | "error" | "cancelled";

type QueueItem = {
  key: string;
  file: File;
  status: QueueItemStatus;
  progress: number;
  error?: string | null;
  abort?: (() => void) | null;
  createdDocs?: ExistingDoc[];
};

export type PropertyDocumentsManagerHandle = {
  uploadQueuedFiles: (propertyId: string) => Promise<{
    uploaded: ExistingDoc[];
    failed: Array<{ key: string; name: string; error: string }>;
  }>;
  clearQueue: () => void;
};

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

function formatBytes(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let v = n;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u++;
  }
  return `${v.toFixed(u === 0 ? 0 : 1)} ${units[u]}`;
}

function truncateMiddle(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const start = Math.ceil(maxLength / 2);
  const end = Math.floor(maxLength / 2);
  return text.slice(0, start) + "..." + text.slice(text.length - end);
}

function safeDate(d: any) {
  try {
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return "";

    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const year = dt.getFullYear();

    let hours = dt.getHours();
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  } catch {
    return "";
  }
}

function docIcon(mime: string | null) {
  const m = (mime || "").toLowerCase();
  if (m.includes("pdf")) return "bi bi-file-earmark-pdf";
  if (m.includes("word") || m.includes("document")) return "bi bi-file-earmark-word";
  if (m.startsWith("image/")) return "bi bi-file-earmark-image";
  return "bi bi-file-earmark";
}

export default forwardRef<
  PropertyDocumentsManagerHandle,
  { propertyId?: string | null; readOnly?: boolean }
>(function PropertyDocumentsManager(
  { propertyId, readOnly = false }: { propertyId?: string | null; readOnly?: boolean },
  ref
) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [docs, setDocs] = useState<ExistingDoc[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);

  const uploadingAny = useMemo(() => queue.some((q) => q.status === "uploading"), [queue]);
  const queuedCount = useMemo(() => queue.filter((q) => q.status === "queued").length, [queue]);

  const fetchDocs = async (pid: string) => {
    setDocsLoading(true);
    setDocsError(null);
    try {
      const res = await fetch(`/api/properties/${pid}/documents`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to load documents");
      }
      const data = await res.json();
      setDocs(Array.isArray(data) ? data : []);
    } catch (e) {
      setDocsError(e instanceof Error ? e.message : "Failed to load documents");
      setDocs([]);
    } finally {
      setDocsLoading(false);
    }
  };

  useEffect(() => {
    if (!propertyId) return;
    fetchDocs(propertyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const addFiles = async (files: File[]) => {
    const errors: string[] = [];
    const validFiles: File[] = [];
    const existingKeys = new Set(queue.map((q) => `${q.file.name}:${q.file.size}`));

    for (const f of files) {
      if (!f) continue;
      const key2 = `${f.name}:${f.size}`;
      if (existingKeys.has(key2)) continue;

      if (f.size > MAX_BYTES) {
        errors.push(`${f.name}: exceeds 10MB`);
        continue;
      }
      if (f.type && !ALLOWED_MIME.has(f.type)) {
        errors.push(`${f.name}: unsupported type`);
        continue;
      }

      validFiles.push(f);
    }

    if (errors.length) {
      alert(errors.slice(0, 6).join("\n") + (errors.length > 6 ? `\n...and ${errors.length - 6} more` : ""));
    }

    if (validFiles.length === 0) return;

    // If propertyId exists, upload immediately
    if (propertyId) {
      for (const f of validFiles) {
        const key = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

        // Add to queue with uploading status
        setQueue((prev) => [...prev, {
          key,
          file: f,
          status: "uploading",
          progress: 0,
          error: null,
          abort: null,
        }]);

        const { promise, abort } = uploadFileToBlobApi({
          propertyId,
          file: f,
          onProgress: (p) => {
            setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, progress: p.percent } : q)));
          },
        });

        setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, abort } : q)));

        try {
          const res = await promise;
          const created = (res?.documents || []) as any as ExistingDoc[];
          setQueue((prev) =>
            prev.map((q) =>
              q.key === key ? { ...q, status: "done", progress: 100, abort: null, createdDocs: created } : q
            )
          );
          // Refresh docs list
          await fetchDocs(propertyId);

          // Auto-remove from queue after 2 seconds
          setTimeout(() => {
            setQueue((prev) => prev.filter((q) => q.key !== key));
          }, 2000);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Upload failed";
          setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, status: "error", error: msg, abort: null } : q)));
        }
      }
    } else {
      // No propertyId yet (add property page), just queue for later
      const next: QueueItem[] = validFiles.map(f => ({
        key: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file: f,
        status: "queued",
        progress: 0,
        error: null,
        abort: null,
      }));
      setQueue((prev) => [...prev, ...next]);
    }
  };

  const removeQueued = (key: string) => {
    setQueue((prev) => prev.filter((q) => q.key !== key));
  };

  const cancelUpload = (key: string) => {
    setQueue((prev) =>
      prev.map((q) => {
        if (q.key !== key) return q;
        try {
          q.abort?.();
        } catch { }
        return { ...q, status: "cancelled", error: "Cancelled", abort: null };
      })
    );
  };

  const cancelAll = () => {
    setQueue((prev) =>
      prev.map((q) => {
        if (q.status !== "uploading") return q;
        try {
          q.abort?.();
        } catch { }
        return { ...q, status: "cancelled", error: "Cancelled", abort: null };
      })
    );
  };

  const clearCompleted = () => {
    setQueue((prev) => prev.filter((q) => !["done", "error", "cancelled"].includes(q.status)));
  };

  const uploadQueuedFiles = async (pid: string) => {
    const uploaded: ExistingDoc[] = [];
    const failed: Array<{ key: string; name: string; error: string }> = [];

    // Snapshot keys that are queued at start; we upload sequentially for stable progress.
    const keysToUpload = queue.filter((q) => q.status === "queued").map((q) => q.key);

    for (const key of keysToUpload) {
      const item = queue.find((q) => q.key === key);
      if (!item) continue;

      setQueue((prev) =>
        prev.map((q) => (q.key === key ? { ...q, status: "uploading", progress: 0, error: null } : q))
      );

      const { promise, abort } = uploadFileToBlobApi({
        propertyId: pid,
        file: item.file,
        onProgress: (p) => {
          setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, progress: p.percent } : q)));
        },
      });

      setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, abort } : q)));

      try {
        const res = await promise;
        const created = (res?.documents || []) as any as ExistingDoc[];
        uploaded.push(...created);
        setQueue((prev) =>
          prev.map((q) =>
            q.key === key ? { ...q, status: "done", progress: 100, abort: null, createdDocs: created } : q
          )
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Upload failed";
        failed.push({ key, name: item.file.name, error: msg });
        setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, status: "error", error: msg, abort: null } : q)));
      }
    }

    if (pid) {
      // Refresh list to reflect all uploads
      await fetchDocs(pid);
    }

    return { uploaded, failed };
  };

  const deleteDoc = async (docId: string) => {
    if (!propertyId) return;
    if (!confirm("Delete this document?")) return;
    try {
      const res = await fetch(`/api/properties/${propertyId}/documents?documentId=${encodeURIComponent(docId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        alert(text || "Failed to delete document");
        return;
      }
      setDocs((prev) => prev.filter((d) => d.id !== docId));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete document");
    }
  };

  useImperativeHandle(ref, () => ({
    uploadQueuedFiles: (pid: string) => uploadQueuedFiles(pid),
    clearQueue: () => setQueue([]),
  }));

  const overall = useMemo(() => {
    const active = queue.filter((q) => ["queued", "uploading", "done", "error", "cancelled"].includes(q.status));
    if (!active.length) return { percent: 0, label: "" };
    const sum = active.reduce((acc, q) => acc + (q.status === "done" ? 100 : q.progress || 0), 0);
    const percent = Math.round(sum / active.length);
    return { percent, label: `${active.filter((q) => q.status === "done").length}/${active.length} uploaded` };
  }, [queue]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {!readOnly && (
        <div
          className="file-upload-area"
          style={{ padding: "16px", borderRadius: "14px", cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">
            <i className="bi bi-upload"></i>
          </div>
          <p className="upload-text">Upload documents</p>
          <p className="upload-info">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => {
              addFiles(Array.from(e.target.files || []));
              e.target.value = ''; // Reset to allow re-selecting same files
            }}
            style={{ display: "none" }}
          />

          {!propertyId && (
            <div style={{ marginTop: "10px", color: "#6B7280", fontSize: "12px" }}>
              Files will upload after the property is created.
            </div>
          )}

        </div>
      )}

      {propertyId && (
        <div style={{ marginTop: "14px" }}>
          <div style={{ fontWeight: 900, color: "#111827", marginBottom: "10px" }}>Uploaded Documents</div>

          {docsLoading ? (
            <div style={{ padding: "10px 0", color: "#6B7280" }}>Loading documents...</div>
          ) : docsError ? (
            <div style={{ padding: "10px 0", color: "#B91C1C" }}>{docsError}</div>
          ) : docs.length === 0 ? (
            <div style={{ padding: "10px 0", color: "#6B7280" }}>No documents uploaded yet.</div>
          ) : (
            <div style={{ display: "grid", gap: "10px" }}>
              {docs.map((d) => (
                <div
                  key={d.id}
                  style={{
                    border: "1px solid rgba(17,24,39,0.10)",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    background: "#fff",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    minWidth: 0
                  }}
                >
                  <i className={docIcon(d.type)} style={{ fontSize: "18px", color: "#111827" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: "13px", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {truncateMiddle(d.name || "Document", 22)}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "12px", marginTop: "2px" }}>
                      {(d.type || "—") + (d.size ? ` • ${formatBytes(Number(d.size) || 0)}` : "")}
                      {d.uploadedAt ? ` • ${safeDate(d.uploadedAt)}` : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="filter-btn"
                      style={{ padding: "10px 12px", textDecoration: "none" }}
                    >
                      Open
                    </a>
                    {!readOnly && (
                      <button
                        type="button"
                        className="link-btn linked"
                        title={uploadingAny ? "Wait for uploads to finish" : "Delete"}
                        onClick={() => deleteDoc(d.id)}
                        disabled={uploadingAny}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
);



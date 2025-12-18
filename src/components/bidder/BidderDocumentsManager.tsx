"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { uploadFileWithProgress } from "@/lib/uploadWithProgress";

type ExistingDoc = {
  id: string;
  bidderId: string;
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
};

export type BidderDocumentsManagerHandle = {
  uploadQueuedFiles: (bidderId: string) => Promise<{
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

function safeDate(d: any) {
  try {
    const dt = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toLocaleString();
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

export default forwardRef<BidderDocumentsManagerHandle, { bidderId?: string | null }>(
  function BidderDocumentsManager({ bidderId }: { bidderId?: string | null }, ref) {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [docs, setDocs] = useState<ExistingDoc[]>([]);
    const [docsLoading, setDocsLoading] = useState(false);
    const [docsError, setDocsError] = useState<string | null>(null);

    const uploadingAny = useMemo(() => queue.some((q) => q.status === "uploading"), [queue]);
    const queuedCount = useMemo(() => queue.filter((q) => q.status === "queued").length, [queue]);

    const fetchDocs = async (bid: string) => {
      setDocsLoading(true);
      setDocsError(null);
      try {
        const res = await fetch(`/api/users/bidders/${bid}/documents`);
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
      if (!bidderId) return;
      fetchDocs(bidderId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bidderId]);

    const addFiles = (files: File[]) => {
      const next: QueueItem[] = [];
      const errors: string[] = [];
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

        next.push({
          key: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          file: f,
          status: "queued",
          progress: 0,
          error: null,
          abort: null,
        });
      }

      if (errors.length) {
        alert(errors.slice(0, 6).join("\n") + (errors.length > 6 ? `\n...and ${errors.length - 6} more` : ""));
      }
      if (next.length) setQueue((prev) => [...prev, ...next]);
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
          } catch {}
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
          } catch {}
          return { ...q, status: "cancelled", error: "Cancelled", abort: null };
        })
      );
    };

    const clearCompleted = () => {
      setQueue((prev) => prev.filter((q) => !["done", "error", "cancelled"].includes(q.status)));
    };

    const uploadQueuedFiles = async (bid: string) => {
      const uploaded: ExistingDoc[] = [];
      const failed: Array<{ key: string; name: string; error: string }> = [];

      const keysToUpload = queue.filter((q) => q.status === "queued").map((q) => q.key);

      for (const key of keysToUpload) {
        const item = queue.find((q) => q.key === key);
        if (!item) continue;

        setQueue((prev) =>
          prev.map((q) => (q.key === key ? { ...q, status: "uploading", progress: 0, error: null } : q))
        );

        const { promise, abort } = uploadFileWithProgress({
          url: `/api/users/bidders/${bid}/documents`,
          fileFieldName: "files",
          file: item.file,
          onProgress: (p) => {
            setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, progress: p.percent } : q)));
          },
        });

        setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, abort } : q)));

        try {
          const res = await promise;
          const created = (res?.documents || []) as ExistingDoc[];
          uploaded.push(...created);
          setQueue((prev) =>
            prev.map((q) => (q.key === key ? { ...q, status: "done", progress: 100, abort: null } : q))
          );
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Upload failed";
          failed.push({ key, name: item.file.name, error: msg });
          setQueue((prev) => prev.map((q) => (q.key === key ? { ...q, status: "error", error: msg, abort: null } : q)));
        }
      }

      await fetchDocs(bid);
      return { uploaded, failed };
    };

    const deleteDoc = async (docId: string) => {
      if (!bidderId) return;
      if (!confirm("Delete this document?")) return;
      try {
        const res = await fetch(
          `/api/users/bidders/${bidderId}/documents?documentId=${encodeURIComponent(docId)}`,
          { method: "DELETE" }
        );
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
      uploadQueuedFiles: (bid: string) => uploadQueuedFiles(bid),
      clearQueue: () => setQueue([]),
    }));

    const overall = useMemo(() => {
      const active = queue.filter((q) => ["queued", "uploading", "done", "error", "cancelled"].includes(q.status));
      if (!active.length) return { percent: 0, label: "" };
      const sum = active.reduce((acc, q) => acc + (q.status === "done" ? 100 : q.progress || 0), 0);
      const percent = Math.round(sum / active.length);
      return { percent, label: `${active.filter((q) => q.status === "done").length}/${active.length} uploaded` };
    }, [queue]);

    return (
      <div>
        <div className="file-upload-area">
          <div className="upload-icon">
            <i className="bi bi-upload"></i>
          </div>
          <p className="upload-text">Upload ID, Driver's License, or Passport</p>
          <p className="upload-info">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>

          <input
            type="file"
            multiple
            onChange={(e) => addFiles(Array.from(e.target.files || []))}
            style={{ marginTop: "10px" }}
          />

          {!bidderId && (
            <div style={{ marginTop: "10px", color: "#6B7280", fontSize: "12px" }}>
              Files will upload after the bidder is created.
            </div>
          )}

          {queue.length > 0 && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                <div style={{ fontWeight: 800, color: "#111827" }}>Upload Queue ({queue.length})</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {bidderId && (
                    <button
                      type="button"
                      className="filter-btn"
                      disabled={uploadingAny || queuedCount === 0}
                      onClick={() => uploadQueuedFiles(bidderId)}
                      style={{ padding: "10px 12px" }}
                    >
                      {uploadingAny ? "Uploading..." : "Upload all"}
                    </button>
                  )}
                  {uploadingAny && (
                    <button type="button" className="filter-btn" onClick={cancelAll} style={{ padding: "10px 12px" }}>
                      Cancel uploads
                    </button>
                  )}
                  <button
                    type="button"
                    className="filter-btn"
                    disabled={uploadingAny}
                    onClick={clearCompleted}
                    style={{ padding: "10px 12px" }}
                  >
                    Clear finished
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "10px" }}>
                <div style={{ height: "8px", background: "rgba(17,24,39,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${overall.percent}%`, background: "#6EA500" }} />
                </div>
                {overall.label && (
                  <div style={{ marginTop: "6px", fontSize: "12px", color: "#6B7280" }}>
                    {overall.label} • {overall.percent}%
                  </div>
                )}
              </div>

              <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
                {queue.map((q) => (
                  <div
                    key={q.key}
                    style={{
                      border: "1px solid rgba(17,24,39,0.10)",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      background: "#fff",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <i className={docIcon(q.file.type)} style={{ fontSize: "18px", color: "#111827" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <div style={{ fontWeight: 800, fontSize: "13px", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {q.file.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7280" }}>{formatBytes(q.file.size)}</div>
                      </div>

                      <div style={{ marginTop: "6px" }}>
                        <div style={{ height: "6px", background: "rgba(17,24,39,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${q.status === "done" ? 100 : q.progress}%`, background: q.status === "error" ? "#EF4444" : "#6EA500" }} />
                        </div>
                      </div>

                      <div style={{ marginTop: "6px", fontSize: "12px", color: q.status === "error" ? "#B91C1C" : "#6B7280" }}>
                        {q.status === "queued" && "Queued"}
                        {q.status === "uploading" && `Uploading... ${q.progress}%`}
                        {q.status === "done" && "Uploaded"}
                        {q.status === "cancelled" && "Cancelled"}
                        {q.status === "error" && (q.error || "Upload failed")}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      {q.status === "uploading" ? (
                        <button type="button" className="link-btn linked" title="Cancel" onClick={() => cancelUpload(q.key)}>
                          <i className="bi bi-x"></i>
                        </button>
                      ) : (
                        <button type="button" className="link-btn linked" title="Remove" onClick={() => removeQueued(q.key)} disabled={uploadingAny}>
                          <i className="bi bi-x"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {bidderId && (
          <div style={{ marginTop: "14px" }}>
            <div style={{ fontWeight: 900, color: "#111827", marginBottom: "10px" }}>Uploaded Identity Documents</div>

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
                    }}
                  >
                    <i className={docIcon(d.type)} style={{ fontSize: "18px", color: "#111827" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: "13px", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {d.name || "Document"}
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
                      <button
                        type="button"
                        className="link-btn linked"
                        title={uploadingAny ? "Wait for uploads to finish" : "Delete"}
                        onClick={() => deleteDoc(d.id)}
                        disabled={uploadingAny}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
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



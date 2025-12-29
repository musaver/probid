export type UploadProgress = { loaded: number; total: number; percent: number };

export type UploadResult = {
  documents: Array<{
    id: string;
    propertyId: string;
    name: string | null;
    url: string;
    pathname: string;
    type: string | null;
    size: string | null;
    uploadedAt: string;
  }>;
};

export function uploadFileWithProgress(opts: {
  url: string;
  fields?: Record<string, string>;
  fileFieldName?: string;
  file: File;
  onProgress?: (p: UploadProgress) => void;
}): { promise: Promise<any>; abort: () => void } {
  const xhr = new XMLHttpRequest();

  const promise = new Promise<any>((resolve, reject) => {
    xhr.open("POST", opts.url);

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const percent = e.total ? Math.round((e.loaded / e.total) * 100) : 0;
      opts.onProgress?.({ loaded: e.loaded, total: e.total, percent });
    };

    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));
    xhr.onload = () => {
      const ok = xhr.status >= 200 && xhr.status < 300;
      if (!ok) {
        reject(new Error(xhr.responseText || `Upload failed (${xhr.status})`));
        return;
      }
      try {
        const json = JSON.parse(xhr.responseText || "{}");
        resolve(json);
      } catch {
        reject(new Error("Upload failed (invalid response)"));
      }
    };

    const fd = new FormData();
    if (opts.fields) {
      for (const [k, v] of Object.entries(opts.fields)) fd.append(k, v);
    }
    fd.append(opts.fileFieldName || "files", opts.file);
    xhr.send(fd);
  });

  return { promise, abort: () => xhr.abort() };
}

export function uploadFileToBlobApi(opts: {
  propertyId: string;
  file: File;
  onProgress?: (p: UploadProgress) => void;
}): { promise: Promise<UploadResult>; abort: () => void } {
  const { promise, abort } = uploadFileWithProgress({
    url: "/api/blob/upload",
    fields: { propertyId: opts.propertyId },
    fileFieldName: "files",
    file: opts.file,
    onProgress: opts.onProgress,
  });
  return { promise: promise as Promise<UploadResult>, abort };
}



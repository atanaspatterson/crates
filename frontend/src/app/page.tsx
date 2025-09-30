"use client";

import { useState } from "react";
import { UploadDropzone } from "../components/UploadDropzone";
import { formatBytes } from "../lib/files";
// app/page.tsx
export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          start a <span className="text-fuchsia-400">remix</span>
        </h1>
        <p className="mt-3 text-neutral-400">
          upload an <span className="text-neutral-200">MP3/WAV</span> (up to 5
          minutes) and we’ll split it into stems
        </p>
      </section>

      <UploadDropzone
        value={file}
        onChange={(f) => {
          setError(null);
          setFile(f);
        }}
        onError={(msg) => setError(msg)}
      />

      {/* Selection summary */}
      {file && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-neutral-100">
              {file.name}
            </p>
            <p className="text-xs text-neutral-500">
              {file.type || "unknown"} • {formatBytes(file.size)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-750"
              onClick={() =>
                document.getElementById("file-input-hidden")?.click()
              }
            >
              replace file
            </button>
            <button
              className="rounded-lg border border-red-900/60 bg-red-900/20 px-3 py-1.5 text-sm text-red-300 hover:bg-red-900/30"
              onClick={() => setFile(null)}
            >
              clear
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-6 rounded-xl border border-amber-800/50 bg-amber-950/40 px-4 py-3 text-amber-300">
          {error}
        </div>
      )}

      {/* Primary CTA (disabled for now; A4 will wire API) */}
      <div className="mt-8 flex justify-center">
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-fuchsia-500/20 hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!file}
          onClick={() => alert("Next step: upload to backend API (A4)")}
        >
          upload & continue
        </button>
      </div>
    </div>
  );
}

// components/UploadDropzone.tsx
import React, { useRef, useState, useCallback } from "react";
import classNames from "classnames";

interface UploadDropzoneProps {
  onChange?: (file: File | null) => void;
  onError?: (reason: string) => void;
  value?: File | null;
  help?: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onChange,
  onError,
  value,
  help = "Drag and drop an audio file, or click to select.",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        onChange?.(null);
        return;
      }
      const file = files[0];
      // Example validation: max size 50MB
      if (file.size > 50 * 1024 * 1024) {
        onError?.("File is too large (max 50MB)");
        return;
      }
      onChange?.(file);
    },
    [onChange, onError],
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={classNames(
          "relative rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors",
          dragOver
            ? "border-fuchsia-400/80 bg-fuchsia-500/5"
            : "border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60",
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onFiles(e.dataTransfer.files);
        }}
        role="region"
        aria-label="audio upload dropzone"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800/70">
          {/* icon: simple arrow/cloud */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="text-neutral-300"
          >
            <path
              fill="currentColor"
              d="M12 16V7l-3.5 3.5l-1.4-1.4L12 3l4.9 6.1l-1.4 1.4L12 7v9zm-7 2v-2h14v2H5z"
            />
          </svg>
        </div>
        <p className="text-sm text-neutral-200">{help}</p>
        <p className="mt-1 text-xs text-neutral-500">
          Max size 50MB • One file • 5 minutes or less
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-750"
            onClick={() => inputRef.current?.click()}
          >
            Choose file
          </button>
          {value && (
            <span className="text-xs text-neutral-500">
              Selected: {value.name}
            </span>
          )}
        </div>

        {/* Hidden input to support clicking "Choose file" and programmatic replace */}
        <input
          id="file-input-hidden"
          ref={inputRef}
          type="file"
          accept="audio/mpeg,audio/wav,audio/wave,.mp3,.wav"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>
    </div>
  );
};

export default UploadDropzone;

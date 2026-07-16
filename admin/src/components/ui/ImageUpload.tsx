import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTimes, FaLink, FaExclamationCircle } from 'react-icons/fa';
import { uploadAPI } from '../../services/api';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = 'Image' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPEG, PNG, WEBP, or GIF image.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image must be smaller than 5MB.');
      return;
    }

    try {
      setProgress(0);
      const { url } = await uploadAPI.uploadImage(file, setProgress);
      onChange(url);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setProgress(null);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput((s) => !s)}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
        >
          <FaLink size={10} />
          {showUrlInput ? 'Hide URL field' : 'Paste URL instead'}
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="mb-3 block w-full rounded-lg border border-surface-100 bg-surface-0 px-3 py-2 text-sm text-surface-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      )}

      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-surface-100 dark:border-white/10">
          <img src={value} alt="Preview" className="h-44 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface-950/70 text-white hover:bg-surface-950"
            aria-label="Remove image"
          >
            <FaTimes size={12} />
          </button>
          {progress !== null && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-surface-950/20">
              <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors
            ${
              dragActive
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                : 'border-surface-100 hover:border-brand-300 hover:bg-surface-50 dark:border-white/10 dark:hover:bg-white/5'
            }`}
        >
          {progress !== null ? (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              <p className="text-sm font-medium text-surface-900 dark:text-white">Uploading… {progress}%</p>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-brand-500" size={26} />
              <p className="text-sm font-medium text-surface-900 dark:text-white">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-xs text-surface-900/40 dark:text-white/30">JPEG, PNG, WEBP or GIF — up to 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
          <FaExclamationCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;

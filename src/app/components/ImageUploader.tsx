'use client';

import React, { useRef, useState } from 'react';
import {
  uploadImageToCloudinary,
  validateImageFile,
} from '../lib/cloudinary';

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  aspect?: 'square' | 'video';
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Product Photo',
  aspect = 'video',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const previewHeight = aspect === 'square' ? 'h-64' : 'h-52';

  return (
    <div className={className}>
      <span className="block text-sm font-medium text-gray-700 mb-2">{label}</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          <img src={value} alt="Uploaded" className={`w-full ${previewHeight} object-cover`} />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3 gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Change
            </button>
            <button
              type="button"
              onClick={removeImage}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Remove
            </button>
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
              <span className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          disabled={isUploading}
          className={`
            w-full ${previewHeight} rounded-xl border-2 border-dashed
            flex flex-col items-center justify-center gap-2
            transition-all duration-200 cursor-pointer
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50 scale-[1.01]'
                : 'border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/40'
            }
          `}
        >
          {isUploading ? (
            <>
              <span className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-semibold text-blue-700">Uploading your image…</span>
            </>
          ) : (
            <>
              <span className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
              </span>
              <span className="text-sm font-semibold text-gray-800">
                <span className="text-blue-600">Click to upload</span> or drag &amp; drop
              </span>
              <span className="text-xs text-gray-500">PNG, JPG or WebP · up to 5MB</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;

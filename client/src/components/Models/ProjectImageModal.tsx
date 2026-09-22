"use client";

import { X, Upload } from "lucide-react";

interface ProjectImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function ProjectImageModal({
  isOpen,
  imageUrl,
  onClose,
  onConfirm,
  isLoading,
}: ProjectImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Change project image
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="overflow-hidden rounded-xl bg-gray-100">
            <img
              src={imageUrl}
              alt="Project preview"
              className="max-h-[400px] w-full object-contain"
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            JPG, PNG or WebP. Maximum size 5MB.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-[#397A68] px-4 py-2 text-sm font-medium text-white hover:bg-[#306b5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={16} />

            {isLoading ? "Uploading..." : "Upload image"}
          </button>
        </div>
      </div>
    </div>
  );
}
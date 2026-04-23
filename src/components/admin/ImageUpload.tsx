import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadApi } from '../../lib/api';

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [error, setError] = useState('');

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const res = await uploadApi.upload(file);
      onChange(res.url);
      setPreview(res.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setPreview('');
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(localUrl);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-primary mb-2">{label}</label>}

      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-100" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mb-3"></div>
              <p className="text-sm text-gray">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray mb-1">Drop an image here or click to upload</p>
              <p className="text-xs text-gray-light">PNG, JPG, WebP up to 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        disabled={isUploading}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

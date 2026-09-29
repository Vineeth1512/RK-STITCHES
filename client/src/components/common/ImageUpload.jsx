import React, { useState, useRef } from 'react';
import { UploadCloud, X, Link as LinkIcon, Copy, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

/**
 * Reusable Image Upload Component
 * Uploads local file -> generates URL via backend/Cloudinary -> passes URL to parent form.
 * Also supports manual URL input and provides a live preview.
 */
export default function ImageUpload({
  value = '',
  onChange,
  label = 'Image',
  placeholder = 'https://...',
  aspectRatio = 'aspect-video',
  className = ''
}) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    setErrorMsg('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload/single', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const generatedUrl = res.data?.data?.url;
      if (generatedUrl) {
        onChange(generatedUrl);
      } else {
        throw new Error('No URL returned from server');
      }
    } catch (err) {
      console.error('[Upload] Error:', err);
      setErrorMsg(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label & Actions */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {value && (
            <button
              type="button"
              onClick={handleCopyUrl}
              className="text-[11px] text-stone-500 hover:text-amber-500 flex items-center space-x-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{mode === 'upload' ? 'Paste URL directly' : 'Upload file instead'}</span>
          </button>
        </div>
      </div>

      {/* Image Preview if value exists */}
      {value ? (
        <div className="space-y-2">
          <div className={`relative ${aspectRatio} w-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 shadow-inner group`}>
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400';
              }}
            />
            {/* Hover Overlay Controls */}
            <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 p-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
              >
                Change Photo
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-stone-400 font-mono truncate flex-1 bg-stone-100 dark:bg-stone-800/80 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700">
              {value}
            </span>
          </div>
        </div>
      ) : (
        /* Upload / Input Area when no image is chosen */
        <div>
          {mode === 'upload' ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                  : 'border-stone-300 dark:border-stone-700 hover:border-amber-500 bg-stone-50/70 dark:bg-stone-800/50'
              }`}
            >
              {uploading ? (
                <div className="py-3 flex flex-col items-center justify-center space-y-2">
                  <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
                  <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Uploading & converting image to URL...
                  </p>
                </div>
              ) : (
                <div className="py-2 flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Click to choose image or drag & drop here
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      JPG, PNG, WebP up to 10MB • Automatically generates image URL
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Manual URL Input */
            <div className="space-y-1.5">
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
              />
              <p className="text-[10px] text-stone-400">
                Paste an external image link (Unsplash, Pinterest, CDN)
              </p>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-500 font-medium">{errorMsg}</p>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

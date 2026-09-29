import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeVideoModal } from '../../store/slices/uiSlice';
import { X, Play } from 'lucide-react';

export default function VideoPlayerModal() {
  const dispatch = useDispatch();
  const activeVideo = useSelector((state) => state.ui.activeVideo);

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800 text-white">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-brand-600/30 text-amber-400 border border-brand-500/30">
              {activeVideo.category}
            </span>
            <h3 className="text-base font-serif font-semibold truncate max-w-md">
              {activeVideo.title}
            </h3>
          </div>
          <button
            onClick={() => dispatch(closeVideoModal())}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <video
            src={activeVideo.videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML5 video tag.
          </video>
        </div>

        {/* Video Description */}
        {activeVideo.description && (
          <div className="p-4 bg-stone-900/90 text-sm text-stone-300 border-t border-stone-800">
            <p>{activeVideo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

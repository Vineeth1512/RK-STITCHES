import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Video, Plus, Trash2, X, Play } from 'lucide-react';

export default function AdminVideos() {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Stitching Process',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-with-a-needle-41716-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
    description: '',
    duration: '1:30'
  });

  const loadVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/videos', form);
      dispatch(addToast({ message: 'Video published to showcase', type: 'success' }));
      setModalOpen(false);
      loadVideos();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to publish video', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video from showcase?')) return;
    try {
      await api.delete(`/videos/${id}`);
      dispatch(addToast({ message: 'Video deleted', type: 'info' }));
      loadVideos();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete video', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Video Showcase Management
          </h1>
          <p className="text-xs text-stone-500">Publish crafting tutorials, before/after videos, and bridal twirls</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div
            key={v._id}
            className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-44 rounded-2xl overflow-hidden bg-stone-900 mb-3 relative">
                <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover opacity-80" />
                <span className="absolute top-2.5 left-2.5 bg-stone-950/70 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {v.category}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-stone-950/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  {v.duration}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white truncate">
                {v.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2 mt-1">{v.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 mt-3 flex justify-end">
              <button
                onClick={() => handleDelete(v._id)}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-semibold flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Video</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl shadow-2xl border p-6 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold">Publish Showcase Video</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                >
                  <option value="Stitching Process">Stitching Process</option>
                  <option value="Before / After">Before / After</option>
                  <option value="Design Showcase">Design Showcase</option>
                  <option value="Maggam Work">Maggam Work</option>
                  <option value="Customer Outfits">Customer Outfits</option>
                  <option value="Behind The Scenes">Behind The Scenes</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Video Stream URL *</label>
                <input
                  type="url"
                  required
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Thumbnail Preview URL *</label>
                <input
                  type="url"
                  required
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Duration (e.g. 1:45)</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold">
                Publish Video
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

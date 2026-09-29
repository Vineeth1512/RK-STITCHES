import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Image, Plus, Trash2, X } from 'lucide-react';

export default function AdminGallery() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Blouse',
    imageUrl: '',
    caption: '',
    isFeatured: true
  });

  const loadGallery = async () => {
    try {
      const res = await api.get('/gallery');
      setItems(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', form);
      dispatch(addToast({ message: 'Photo added to lookbook', type: 'success' }));
      setModalOpen(false);
      setForm({ title: '', category: 'Blouse', imageUrl: '', caption: '', isFeatured: true });
      loadGallery();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to add photo', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      dispatch(addToast({ message: 'Photo deleted', type: 'info' }));
      loadGallery();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete photo', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Lookbook Gallery Management
          </h1>
          <p className="text-xs text-stone-500">Upload photos to the masonry portfolio lookbook</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="group relative rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-sm"
          >
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-3 bg-white dark:bg-stone-900">
              <span className="text-[10px] font-bold text-amber-500 uppercase">{item.category}</span>
              <p className="font-serif text-sm font-bold truncate">{item.title}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 p-2 rounded-lg bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl shadow-2xl border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold">Add Lookbook Photo</h3>
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
                  <option value="Blouse">Blouse</option>
                  <option value="Maggam Work">Maggam Work</option>
                  <option value="Lehenga">Lehenga</option>
                  <option value="Frock">Frock</option>
                  <option value="Kurti">Kurti</option>
                  <option value="Langa">Langa</option>
                  <option value="Uniform">Uniform</option>
                  <option value="Custom Designs">Custom Designs</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Caption</label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold">
                Add to Lookbook
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

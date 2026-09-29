import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Sparkles, Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../../components/common/ImageUpload';

export default function AdminDesigns() {
  const dispatch = useDispatch();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: '',
    category: 'Maggam Work',
    description: '',
    estimatedPrice: 3500,
    priceNote: 'Stitching and lining included',
    images: [],
    tags: 'Bridal, Peacock, Zardozi',
    fabricRecommendation: 'Raw Silk, Mulberry Silk',
    isFeatured: true
  };

  const [form, setForm] = useState(initialForm);

  const loadDesigns = async () => {
    try {
      const res = await api.get('/designs');
      setDesigns(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesigns();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (d) => {
    setEditingId(d._id);
    setForm({
      title: d.title,
      category: d.category,
      description: d.description,
      estimatedPrice: d.estimatedPrice || 0,
      priceNote: d.priceNote || '',
      images: d.images || [],
      tags: Array.isArray(d.tags) ? d.tags.join(', ') : d.tags,
      fabricRecommendation: d.fabricRecommendation || '',
      isFeatured: d.isFeatured || false
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this design from collections?')) return;
    try {
      await api.delete(`/designs/${id}`);
      dispatch(addToast({ message: 'Design removed', type: 'info' }));
      loadDesigns();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete design', type: 'error' }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/designs/${editingId}`, form);
        dispatch(addToast({ message: 'Design updated successfully', type: 'success' }));
      } else {
        await api.post('/designs', form);
        dispatch(addToast({ message: 'Design created successfully', type: 'success' }));
      }
      setModalOpen(false);
      loadDesigns();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to save design', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Fashion Collections & Designs
          </h1>
          <p className="text-xs text-stone-500">Manage atelier lookbook and inspirational styles</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Design</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((d) => (
          <div
            key={d._id}
            className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="h-56 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 relative">
                <img src={d.images?.[0]} alt={d.title} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-stone-950/70 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {d.category}
                </span>
                {d.isFeatured && (
                  <span className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white leading-tight">
                {d.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2 mt-1">{d.description}</p>
              <p className="text-sm font-bold text-brand-600 dark:text-amber-400 mt-2">₹{d.estimatedPrice}</p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleOpenEdit(d)}
                className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center space-x-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-semibold flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">
                {editingId ? 'Edit Design' : 'Add Fashion Design'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-semibold mb-1">Design Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
                  >
                    <option value="Blouses">Blouses</option>
                    <option value="Maggam Work">Maggam Work</option>
                    <option value="Lehengas">Lehengas</option>
                    <option value="Long Frocks">Long Frocks</option>
                    <option value="Kurtis & Suits">Kurtis & Suits</option>
                    <option value="Langa Blouses">Langa Blouses</option>
                    <option value="Uniforms">Uniforms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Estimated Price (₹)</label>
                  <input
                    type="number"
                    value={form.estimatedPrice}
                    onChange={(e) => setForm({ ...form, estimatedPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
                  />
                </div>
              </div>

              <ImageUpload
                label="Design Image"
                value={form.images[0] || ''}
                onChange={(url) => setForm({ ...form, images: url ? [url] : [] })}
              />

              <div>
                <label className="block text-xs font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Recommended Fabrics</label>
                <input
                  type="text"
                  value={form.fabricRecommendation}
                  onChange={(e) => setForm({ ...form, fabricRecommendation: e.target.value })}
                  placeholder="e.g. Raw Silk, Kanjeevaram, Organza"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-sm"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="designFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <label htmlFor="designFeatured" className="text-xs font-semibold">
                  Feature in Showcase
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                >
                  Save Design
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

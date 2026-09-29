import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Scissors, Plus, Edit2, Trash2, X, CheckCircle2 } from 'lucide-react';
import ImageUpload from '../../components/common/ImageUpload';

export default function AdminServices() {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    name: '',
    category: 'Blouses',
    shortDescription: '',
    description: '',
    startingPrice: 650,
    priceRange: '₹650 - ₹1,500',
    estimatedDays: '3-4 business days',
    isFeatured: false,
    images: [],
    tags: 'Bridal, Custom, Tailored'
  };

  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        api.get('/services'),
        api.get('/categories')
      ]);
      setServices(sRes.data?.data || []);
      setCategories(cRes.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      category: s.category,
      shortDescription: s.shortDescription,
      description: s.description,
      startingPrice: s.startingPrice,
      priceRange: s.priceRange || '',
      estimatedDays: s.estimatedDays,
      isFeatured: s.isFeatured,
      images: s.images || [],
      tags: Array.isArray(s.tags) ? s.tags.join(', ') : s.tags
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      dispatch(addToast({ message: 'Service deleted', type: 'info' }));
      loadData();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete service', type: 'error' }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, form);
        dispatch(addToast({ message: 'Service updated', type: 'success' }));
      } else {
        await api.post('/services', form);
        dispatch(addToast({ message: 'Service created', type: 'success' }));
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to save service', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Tailoring Services Management
          </h1>
          <p className="text-xs text-stone-500">Configure public offerings, base pricing, and turnaround times</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700 dark:text-stone-300">
            <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Category</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Est. Turnaround</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {services.map((s) => (
                <tr key={s._id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                  <td className="p-4 flex items-center space-x-3">
                    <img
                      src={s.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=80'}
                      alt={s.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">{s.name}</p>
                      <p className="text-[11px] text-stone-400 line-clamp-1">{s.shortDescription}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-brand-600 dark:text-amber-400">{s.category}</td>
                  <td className="p-4 font-bold text-stone-900 dark:text-white">₹{s.startingPrice}</td>
                  <td className="p-4">{s.estimatedDays}</td>
                  <td className="p-4">
                    {s.isFeatured ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Featured
                      </span>
                    ) : (
                      <span className="text-stone-400">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                {editingId ? 'Edit Service' : 'Add Tailoring Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-semibold mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.startingPrice}
                    onChange={(e) => setForm({ ...form, startingPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <ImageUpload
                label="Service Image"
                value={form.images[0] || ''}
                onChange={(url) => setForm({ ...form, images: url ? [url] : [] })}
              />

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Feature on Homepage
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
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { HelpCircle, Plus, Trash2, X } from 'lucide-react';

export default function AdminFAQs() {
  const dispatch = useDispatch();
  const [faqs, setFaqs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'Stitching'
  });

  const loadFaqs = async () => {
    try {
      const res = await api.get('/faqs');
      setFaqs(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/faqs', form);
      dispatch(addToast({ message: 'FAQ added', type: 'success' }));
      setModalOpen(false);
      setForm({ question: '', answer: '', category: 'Stitching' });
      loadFaqs();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to add FAQ', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      dispatch(addToast({ message: 'FAQ deleted', type: 'info' }));
      loadFaqs();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete FAQ', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            FAQ Management
          </h1>
          <p className="text-xs text-stone-500">Manage frequently asked questions on timelines, measurements, and delivery</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                {faq.category}
              </span>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                {faq.answer}
              </p>
            </div>
            <button
              onClick={() => handleDelete(faq._id)}
              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl shadow-2xl border p-6 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold">Add New FAQ</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                >
                  <option value="Stitching">Stitching</option>
                  <option value="Measurements">Measurements</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Payments">Payments</option>
                  <option value="Maggam Work">Maggam Work</option>
                  <option value="Custom Designs">Custom Designs</option>
                  <option value="Alterations">Alterations</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Answer *</label>
                <textarea
                  rows={3}
                  required
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold">
                Save FAQ
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Tag, Plus, Trash2, X } from 'lucide-react';

export default function AdminCoupons() {
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: '',
    description: '',
    discountType: 'PERCENTAGE',
    discountAmount: 10,
    minOrderAmount: 1000,
    maxDiscount: 300,
    endDate: '2026-12-31',
    usageLimit: 200
  });

  const loadCoupons = async () => {
    try {
      const res = await api.get('/coupons');
      setCoupons(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/coupons', form);
      dispatch(addToast({ message: 'Promo coupon created', type: 'success' }));
      setModalOpen(false);
      loadCoupons();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to create coupon', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await api.delete(`/coupons/${id}`);
      dispatch(addToast({ message: 'Coupon deleted', type: 'info' }));
      loadCoupons();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete coupon', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Promotional Coupons & Discounts
          </h1>
          <p className="text-xs text-stone-500">Manage seasonal offers, bridal promo codes, and usage limits</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c._id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-300 dark:border-amber-800">
                  {c.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-600">Active</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium pt-2">{c.description}</p>
              <div className="text-xs space-y-1 text-stone-500 pt-1">
                <p>Discount: <strong className="text-stone-900 dark:text-white">{c.discountAmount}{c.discountType === 'PERCENTAGE' ? '%' : ' ₹'} OFF</strong></p>
                <p>Min Order: ₹{c.minOrderAmount}</p>
                <p>Valid Until: {new Date(c.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(c._id)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center space-x-1"
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
          <div className="bg-white dark:bg-stone-900 w-full max-w-md rounded-3xl shadow-2xl border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold">Create Coupon</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Coupon Code (Uppercase) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border uppercase font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={form.discountAmount}
                    onChange={(e) => setForm({ ...form, discountAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Min Order Amount (₹)</label>
                <input
                  type="number"
                  value={form.minOrderAmount}
                  onChange={(e) => setForm({ ...form, minOrderAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Expiry Date *</label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 15% discount for Diwali bookings"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold">
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Ruler, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';

export default function CustomerMeasurements() {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    profileTitle: '',
    clothingType: 'Blouse',
    unit: 'inches',
    shoulder: 14.5,
    chest: 36,
    waist: 30,
    hip: 38,
    sleeveLength: 10,
    armhole: 16,
    sleeveRound: 11,
    blouseLength: 14,
    dressLength: 52,
    frontNeckDepth: 6.5,
    backNeckDepth: 8.5,
    neckType: 'Princess Cut / U-Neck',
    customNotes: '',
    isDefault: false
  };

  const [form, setForm] = useState(initialForm);

  const loadProfiles = async () => {
    try {
      const res = await api.get('/measurements/my');
      setProfiles(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (profile) => {
    setEditingId(profile._id);
    setForm({
      profileTitle: profile.profileTitle,
      clothingType: profile.clothingType,
      unit: profile.unit || 'inches',
      shoulder: profile.shoulder || 0,
      chest: profile.chest || 0,
      waist: profile.waist || 0,
      hip: profile.hip || 0,
      sleeveLength: profile.sleeveLength || 0,
      armhole: profile.armhole || 0,
      sleeveRound: profile.sleeveRound || 0,
      blouseLength: profile.blouseLength || 0,
      dressLength: profile.dressLength || 0,
      frontNeckDepth: profile.frontNeckDepth || 0,
      backNeckDepth: profile.backNeckDepth || 0,
      neckType: profile.neckType || '',
      customNotes: profile.customNotes || '',
      isDefault: profile.isDefault || false
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this measurement profile?')) return;
    try {
      await api.delete(`/measurements/${id}`);
      dispatch(addToast({ message: 'Measurement profile deleted', type: 'info' }));
      loadProfiles();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete measurement profile', type: 'error' }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.profileTitle.trim()) {
      dispatch(addToast({ message: 'Please provide a profile name', type: 'warning' }));
      return;
    }

    try {
      if (editingId) {
        await api.put(`/measurements/${editingId}`, form);
        dispatch(addToast({ message: 'Measurement profile updated', type: 'success' }));
      } else {
        await api.post('/measurements', form);
        dispatch(addToast({ message: 'Measurement profile saved', type: 'success' }));
      }
      setModalOpen(false);
      loadProfiles();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to save measurement profile', type: 'error' }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Saved Measurement Profiles
          </h1>
          <p className="text-xs text-stone-500">
            Create and manage reusable measurement profiles for blouses, lehengas, and frocks
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center space-x-2 shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Measurement Profile</span>
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((p) => (
          <div
            key={p._id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                      {p.profileTitle}
                    </h3>
                    {p.isDefault && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-brand-600 dark:text-amber-400 font-medium">
                    Type: {p.clothingType}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Measurements snapshot grid */}
              <div className="grid grid-cols-3 gap-2.5 text-xs pt-2">
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Shoulder</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.shoulder || 0}"</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Chest/Bust</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.chest || 0}"</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Waist</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.waist || 0}"</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Sleeve Length</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.sleeveLength || 0}"</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Armhole</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.armhole || 0}"</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <span className="text-stone-400 block text-[10px]">Length</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{p.blouseLength || p.dressLength || 0}"</span>
                </div>
              </div>

              {p.customNotes && (
                <p className="text-xs text-stone-500 italic pt-1">
                  Note: {p.customNotes}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
              <Link
                to={`/custom-stitching?clothingType=${encodeURIComponent(p.clothingType)}`}
                className="w-full block py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-center transition-colors"
              >
                Use For New Stitching Order →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {profiles.length === 0 && !loading && (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Ruler className="w-12 h-12 mx-auto text-stone-300" />
          <h3 className="font-serif text-xl font-bold">No Saved Measurements</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Save your bust, shoulder, waist, and sleeve dimensions once to reuse on all future stitching bookings.
          </p>
          <button
            onClick={handleOpenCreate}
            className="py-2.5 px-6 rounded-xl bg-brand-600 text-white font-semibold text-xs"
          >
            Create First Profile
          </button>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                {editingId ? 'Edit Measurement Profile' : 'New Measurement Profile'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    Profile Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.profileTitle}
                    onChange={(e) => setForm({ ...form, profileTitle: e.target.value })}
                    placeholder="e.g. Wedding Blouse Perfect Fit"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                    Garment Category
                  </label>
                  <select
                    value={form.clothingType}
                    onChange={(e) => setForm({ ...form, clothingType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  >
                    <option value="Blouse">Blouse</option>
                    <option value="Lehenga">Lehenga / Choli</option>
                    <option value="Long Frock">Long Frock / Gown</option>
                    <option value="Kurti">Kurti & Pants</option>
                    <option value="Uniform">Uniform</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[11px] text-stone-400">Shoulder (in)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.shoulder}
                    onChange={(e) => setForm({ ...form, shoulder: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Chest / Bust</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.chest}
                    onChange={(e) => setForm({ ...form, chest: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Waist</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.waist}
                    onChange={(e) => setForm({ ...form, waist: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Hip</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.hip}
                    onChange={(e) => setForm({ ...form, hip: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Sleeve Length</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.sleeveLength}
                    onChange={(e) => setForm({ ...form, sleeveLength: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Armhole</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.armhole}
                    onChange={(e) => setForm({ ...form, armhole: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Blouse Length</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.blouseLength}
                    onChange={(e) => setForm({ ...form, blouseLength: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-400">Dress Length</label>
                  <input
                    type="number"
                    step="0.25"
                    value={form.dressLength}
                    onChange={(e) => setForm({ ...form, dressLength: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  Custom Notes
                </label>
                <textarea
                  rows={2}
                  value={form.customNotes}
                  onChange={(e) => setForm({ ...form, customNotes: e.target.value })}
                  placeholder="e.g. Needs extra room in armholes, prefers deep U neckline"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-brand-600 text-white font-semibold text-xs hover:bg-brand-700 shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

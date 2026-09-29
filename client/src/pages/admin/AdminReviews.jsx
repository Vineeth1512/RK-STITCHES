import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Star, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

export default function AdminReviews() {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const res = await api.get('/reviews/admin');
      setReviews(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleModerate = async (id, isApproved, isFeatured = false) => {
    try {
      await api.patch(`/reviews/${id}/moderate`, { isApproved, isFeatured });
      dispatch(addToast({ message: 'Review moderation updated', type: 'success' }));
      loadReviews();
    } catch (err) {
      dispatch(addToast({ message: 'Moderation action failed', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      dispatch(addToast({ message: 'Review deleted', type: 'info' }));
      loadReviews();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete review', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Customer Reviews Moderation
        </h1>
        <p className="text-xs text-stone-500">Approve or reject customer feedback for the public website</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  {r.authorName}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.isApproved
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {r.isApproved ? 'Approved' : 'Pending Verification'}
                </span>
              </div>

              <div className="flex text-amber-400">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
                "{r.comment}"
              </p>

              <span className="text-[10px] text-stone-400 block pt-1">
                Service: {r.serviceName} • {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={() => handleDelete(r._id)}
                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex space-x-2">
                {!r.isApproved ? (
                  <button
                    onClick={() => handleModerate(r._id, true, true)}
                    className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                  >
                    Approve Review
                  </button>
                ) : (
                  <button
                    onClick={() => handleModerate(r._id, false)}
                    className="py-1.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold"
                  >
                    Unapprove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

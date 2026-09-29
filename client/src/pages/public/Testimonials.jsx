import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Star, MessageSquare, CheckCircle2, User, Send } from 'lucide-react';

export default function Testimonials() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [testimonials, setTestimonials] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceName, setServiceName] = useState('Blouse Stitching');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/reviews')
      .then((res) => {
        setTestimonials(res.data?.data?.featuredTestimonials || []);
        setReviews(res.data?.data?.customerReviews || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(addToast({ message: 'Please log in to submit an order review', type: 'warning' }));
      return;
    }
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        rating,
        comment,
        serviceName
      });
      dispatch(addToast({
        message: 'Thank you! Your review has been submitted for verification.',
        type: 'success'
      }));
      setComment('');
    } catch (err) {
      dispatch(addToast({
        message: err.response?.data?.message || 'Failed to submit review',
        type: 'error'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Client Feedback
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Stories of Style & Satisfaction
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Read genuine reviews from brides, festive shoppers, and daily wear clients who trust RK Stitches with their most cherished fabrics.
        </p>
      </div>

      {/* Featured Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(t.rating || 5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
                "{t.reviewText}"
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center space-x-3">
              <img
                src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={t.clientName}
                className="w-11 h-11 rounded-full object-cover border border-amber-400/40"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">{t.clientName}</h4>
                <p className="text-xs text-stone-400">{t.occasion || t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Section */}
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-lg space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            Had an Outfit Stitched by Us?
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Share your experience and fitting feedback with our master atelier.
          </p>
        </div>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
              Select Rating:
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'text-amber-400 fill-current'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
              Service Stitched:
            </label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
            >
              <option value="Blouse Stitching">Blouse Stitching</option>
              <option value="Maggam Work">Maggam & Aari Work</option>
              <option value="Bridal Lehenga">Bridal Lehenga</option>
              <option value="Long Frock">Long Frock / Gown</option>
              <option value="Kurti & Salwar">Kurti & Salwar</option>
              <option value="Uniforms">Uniforms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
              Your Review:
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the fitting, stitching quality, finishing, and turnaround time..."
              className="w-full p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center space-x-2 shadow-md disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Submitting...' : 'Post Customer Review'}</span>
          </button>
        </form>
      </div>

    </div>
  );
}

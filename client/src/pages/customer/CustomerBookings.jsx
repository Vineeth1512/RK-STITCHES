import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Calendar, Scissors, Clock, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CustomerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my')
      .then((res) => setBookings(res.data?.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
      CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
      MEASUREMENTS_REQUIRED: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
      IN_PROGRESS: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
      READY: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
      COMPLETED: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-300',
      CANCELLED: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300'
    };
    return badges[status] || 'bg-stone-100 text-stone-700';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            My Stitching Orders & Tracker
          </h1>
          <p className="text-xs text-stone-500">
            View order status, tailor updates, and delivery timelines
          </p>
        </div>
        <Link
          to="/custom-stitching"
          className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-colors self-start sm:self-auto"
        >
          + Book New Stitching
        </Link>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-brand-600 dark:text-amber-400">
                    #{booking.bookingNumber}
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  {booking.clothingType}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-stone-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Target: {new Date(booking.requiredDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Mode: </span>
                    {booking.pickupType === 'HOME_DELIVERY' ? 'Doorstep Delivery' : 'Boutique Pickup'}
                  </div>
                  {booking.estimatedCost > 0 && (
                    <div>
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Cost: </span>
                      ₹{booking.estimatedCost}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                <Link
                  to={`/dashboard/bookings/${booking._id}`}
                  className="py-2.5 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-colors"
                >
                  <span>Track Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Calendar className="w-12 h-12 mx-auto text-stone-300" />
          <h3 className="font-serif text-xl font-bold">No Bookings Yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You haven't submitted any custom stitching orders yet. Start your first made-to-measure outfit today!
          </p>
          <Link
            to="/custom-stitching"
            className="inline-block py-2.5 px-6 rounded-xl bg-brand-600 text-white font-semibold text-xs"
          >
            Start Stitching Order
          </Link>
        </div>
      )}

    </div>
  );
}

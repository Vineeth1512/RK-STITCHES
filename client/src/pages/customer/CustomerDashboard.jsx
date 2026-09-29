import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import {
  Calendar,
  Ruler,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Scissors
} from 'lucide-react';

export default function CustomerDashboard() {
  const user = useSelector((state) => state.auth.user);
  const [bookings, setBookings] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, measurementsRes] = await Promise.all([
          api.get('/bookings/my'),
          api.get('/measurements/my')
        ]);
        setBookings(bookingsRes.data?.data || []);
        setMeasurements(measurementsRes.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeBookings = bookings.filter((b) => !['COMPLETED', 'CANCELLED'].includes(b.status));
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-brand-950 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Tailoring Atelier</span>
          </div>
          <h1 className="font-serif text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg">
            Track your ongoing stitching orders, manage your saved measurement profiles, and explore new handcrafted styles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/custom-stitching"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-semibold text-xs sm:text-sm text-center shadow-md active:scale-95 transition-all"
          >
            + Book New Stitching
          </Link>
          <Link
            to="/dashboard/measurements"
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm text-center transition-all"
          >
            My Measurements
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 uppercase font-semibold">Active Orders</span>
            <p className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {activeBookings.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 uppercase font-semibold">Completed Orders</span>
            <p className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {completedBookings.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 uppercase font-semibold">Saved Profiles</span>
            <p className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {measurements.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center">
            <Ruler className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 uppercase font-semibold">Free Alterations</span>
            <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              Guaranteed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Scissors className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              Recent Stitching Requests
            </h2>
            <p className="text-xs text-stone-500">Live order status and timeline</p>
          </div>
          <Link
            to="/dashboard/bookings"
            className="text-xs font-semibold text-brand-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => {
              const statusColors = {
                PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
                IN_PROGRESS: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
                READY: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
                COMPLETED: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300',
                CANCELLED: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              };

              return (
                <div
                  key={booking._id}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-brand-600 dark:text-amber-400">
                        #{booking.bookingNumber}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          statusColors[booking.status] || 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {booking.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                      {booking.clothingType}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Target Delivery: {new Date(booking.requiredDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/dashboard/bookings/${booking._id}`}
                      className="py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-stone-400">
            <Scissors className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="text-sm">You have no stitching orders yet.</p>
            <Link
              to="/custom-stitching"
              className="inline-block mt-3 py-2 px-4 rounded-xl bg-brand-600 text-white text-xs font-semibold"
            >
              Start First Stitching Booking
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

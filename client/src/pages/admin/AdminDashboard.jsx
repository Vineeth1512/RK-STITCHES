import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Scissors,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then((res) => setStats(res.data?.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-stone-500">Loading admin analytics...</p>
      </div>
    );
  }

  const cards = stats?.cards || {};

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Control Center
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Admin Atelier Overview
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/bookings"
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
          >
            Manage Orders
          </Link>
          <Link
            to="/admin/services"
            className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs transition-colors"
          >
            Manage Services
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">Customers</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            {cards.totalCustomers || 0}
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">+12% this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">Total Orders</span>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            {cards.totalBookings || 0}
          </p>
          <span className="text-[10px] text-stone-400">All-time bookings</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400">
            {cards.pendingBookings || 0}
          </p>
          <span className="text-[10px] text-amber-500 font-semibold">Requires review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">In Progress</span>
            <Scissors className="w-4 h-4 text-brand-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-purple-600 dark:text-purple-400">
            {cards.inProgressBookings || 0}
          </p>
          <span className="text-[10px] text-stone-400">On sewing tables</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {cards.completedBookings || 0}
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">Delivered</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase">Est. Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            ₹{(cards.totalRevenue || 145000).toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">Bespoke turnover</span>
        </div>

      </div>

      {/* Visual Analytics Charts & Popular Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Trend Bar Chart */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Monthly Orders & Revenue Growth
              </h3>
              <p className="text-xs text-stone-500">Stitching orders fulfilled over the past 6 months</p>
            </div>
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
              6-Month Trend
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-4 pt-2">
            {stats?.monthlyData?.map((m) => {
              const maxVal = 100;
              const barWidth = Math.min(Math.round((m.bookings / maxVal) * 100), 100);
              return (
                <div key={m.month} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700 dark:text-stone-300">{m.month} 2026</span>
                    <span className="text-stone-900 dark:text-white">
                      {m.bookings} Orders (₹{m.revenue.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-brand-600 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
              Popular Services
            </h3>
            <p className="text-xs text-stone-500">Most requested stitching garments</p>
          </div>

          <div className="space-y-3">
            {stats?.popularCategories?.map((cat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    {cat._id}
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-600 dark:text-amber-400">
                  {cat.count} orders
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

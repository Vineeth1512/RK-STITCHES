import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Scissors, User, Phone, Mail, Lock } from 'lucide-react';
import GoogleAuthButton from '../../components/common/GoogleAuthButton';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isStaff, setIsStaff] = useState(false);
  const [staffPasscode, setStaffPasscode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      dispatch(addToast({ message: 'Passwords do not match', type: 'error' }));
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        isStaff,
        staffPasscode
      });

      dispatch(loginSuccess(res.data?.data));
      const role = res.data?.data?.user?.role;
      if (role === 'STAFF') {
        dispatch(addToast({ message: 'Welcome to RK Stitches Staff Portal!', type: 'success' }));
        navigate('/admin');
      } else {
        dispatch(addToast({ message: 'Account created successfully! Welcome to RK Stitches.', type: 'success' }));
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create account';
      dispatch(addToast({ message: msg, type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">RK STITCHES</span>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-2">
            Create Customer Account
          </h2>
          <p className="text-xs text-stone-500">
            Save measurement profiles, track orders, and curate wishlists
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ananya Reddy"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98123 45678"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Confirm *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Staff Registration Checkbox */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isStaffCheck"
                checked={isStaff}
                onChange={(e) => setIsStaff(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-stone-300"
              />
              <label htmlFor="isStaffCheck" className="text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                Register as Boutique Staff / Tailor
              </label>
            </div>
            {isStaff && (
              <div className="animate-slide-up pl-6">
                <input
                  type="password"
                  required={isStaff}
                  value={staffPasscode}
                  onChange={(e) => setStaffPasscode(e.target.value)}
                  placeholder="Enter Staff Passcode (e.g. RKSTAFF2026)"
                  className="w-full px-3 py-2 rounded-xl bg-amber-50/60 dark:bg-stone-800 border border-amber-300 dark:border-amber-700 text-xs focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">
                  Requires authorized boutique passcode from administrator.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-stone-200 dark:border-stone-700 w-full" />
            <span className="bg-white dark:bg-stone-900 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 shrink-0">
              or sign up with
            </span>
            <div className="border-t border-stone-200 dark:border-stone-700 w-full" />
          </div>

          <GoogleAuthButton text="Sign up with Google" />
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 dark:text-amber-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
}

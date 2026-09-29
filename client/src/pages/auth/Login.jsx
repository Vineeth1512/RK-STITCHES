import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Scissors, Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';
import GoogleAuthButton from '../../components/common/GoogleAuthButton';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Capture Passport Google OAuth callback redirect
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');
    const errorParam = params.get('error');

    if (errorParam) {
      dispatch(addToast({ message: decodeURIComponent(errorParam), type: 'error' }));
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        dispatch(loginSuccess({ token, user }));
        dispatch(addToast({ message: `Welcome back, ${user.name}!`, type: 'success' }));
        if (['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user.role)) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } catch (err) {
        console.error('Failed to parse Google OAuth user:', err);
      }
    }
  }, [location.search, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    dispatch(loginStart());
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(res.data?.data));
      dispatch(addToast({ message: 'Welcome back to RK Stitches!', type: 'success' }));

      const role = res.data?.data?.user?.role;
      if (['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(role)) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials';
      dispatch(loginFailure(msg));
      dispatch(addToast({ message: msg, type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@rkstitches.com');
    setPassword('Admin@123456');
  };

  const fillDemoCustomer = () => {
    setEmail('ananya@example.com');
    setPassword('Customer@123456');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">RK STITCHES</span>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-2">
            Sign In to Your Studio
          </h2>
          <p className="text-xs text-stone-500">
            Access your orders, saved measurements, and wishlist
          </p>
        </div>

        {/* Demo Login Quick-Fill Buttons */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
            ⚡ Quick Demo Accounts:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="flex-1 py-1.5 px-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 shadow-sm transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="flex-1 py-1.5 px-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 shadow-sm transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Demo Customer</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-brand-600 dark:text-amber-400 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-stone-200 dark:border-stone-700 w-full" />
            <span className="bg-white dark:bg-stone-900 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 shrink-0">
              or continue with
            </span>
            <div className="border-t border-stone-200 dark:border-stone-700 w-full" />
          </div>

          <GoogleAuthButton text="Sign in with Google" />
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-brand-600 dark:text-amber-400 font-semibold hover:underline">
            Register for Free
          </Link>
        </div>

      </div>
    </div>
  );
}

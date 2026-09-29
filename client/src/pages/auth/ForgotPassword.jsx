import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import { Scissors, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    dispatch(addToast({
      message: 'Password reset instructions sent to your email address.',
      type: 'info'
    }));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">RK STITCHES</span>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-2">
            Reset Password
          </h2>
          <p className="text-xs text-stone-500">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs text-emerald-900 dark:text-emerald-200">
              We have dispatched a secure recovery link to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="inline-block text-xs font-bold text-brand-600 dark:text-amber-400 hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              Send Recovery Link
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="text-xs font-semibold text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 inline-flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

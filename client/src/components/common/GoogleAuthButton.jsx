import React from 'react';

/**
 * GoogleAuthButton using passport-google-oauth20
 * Redirects the user directly to /api/auth/google endpoint handled by Passport.js
 */
export default function GoogleAuthButton({ text = 'Continue with Google' }) {
  const handleGoogleLogin = () => {
    const rawApiUrl =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.PROD
        ? 'https://rk-stitches-backend.onrender.com/api'
        : 'http://localhost:5000/api');
    const baseUrl = rawApiUrl.endsWith('/api')
      ? rawApiUrl
      : `${rawApiUrl.replace(/\/+$/, '')}/api`;
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center justify-center space-x-3 shadow-sm transition-all active:scale-[0.99]"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.34 21.48 7.39 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.34 2.52 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
        />
      </svg>
      <span>{text}</span>
    </button>
  );
}

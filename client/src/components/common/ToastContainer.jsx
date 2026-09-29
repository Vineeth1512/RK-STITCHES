import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.ui.toasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                : isError
                ? 'bg-rose-50 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                : isWarning
                ? 'bg-amber-50 dark:bg-amber-950/90 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
                : 'bg-stone-50 dark:bg-stone-900/90 border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-100'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-brand-600" />}
            </div>
            <div className="flex-1 text-sm font-medium pr-2">
              {toast.message}
            </div>
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className="flex-shrink-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

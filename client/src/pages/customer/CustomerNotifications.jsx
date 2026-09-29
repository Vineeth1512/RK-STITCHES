import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Bell, CheckCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CustomerNotifications() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await api.get('/notifications/my');
      setNotifications(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      dispatch(addToast({ message: 'All notifications marked as read', type: 'info' }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-xs text-stone-500">Live order milestones and studio alerts</p>
        </div>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs font-semibold text-brand-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <CheckCheck className="w-4 h-4 mr-1" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => handleMarkAsRead(item._id)}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                item.isRead
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-80'
                  : 'bg-brand-50/40 dark:bg-stone-800/80 border-brand-300 dark:border-brand-800 shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    item.isRead
                      ? 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                      : 'bg-brand-600 text-white'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-2 text-[10px] text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {item.link && (
                <Link
                  to={item.link}
                  className="p-2 rounded-lg text-stone-400 hover:text-brand-600 self-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
          <Bell className="w-10 h-10 mx-auto text-stone-300" />
          <p className="text-sm text-stone-500">You have no new notifications right now.</p>
        </div>
      )}

    </div>
  );
}

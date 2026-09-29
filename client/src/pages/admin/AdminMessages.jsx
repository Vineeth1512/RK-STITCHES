import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { MessageSquare, Mail, Phone, Send, Trash2 } from 'lucide-react';

export default function AdminMessages() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const loadMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSendReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      await api.patch(`/messages/${id}/reply`, { reply: replyText });
      dispatch(addToast({ message: 'Reply recorded and customer notified', type: 'success' }));
      setActiveReplyId(null);
      setReplyText('');
      loadMessages();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to send reply', type: 'error' }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/messages/${id}`);
      dispatch(addToast({ message: 'Message deleted', type: 'info' }));
      loadMessages();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to delete message', type: 'error' }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          Inquiries & Contact Requests
        </h1>
        <p className="text-xs text-stone-500">Customer questions from the public website</p>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                  {m.category} • {new Date(m.createdAt).toLocaleString()}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  {m.subject}
                </h3>
                <p className="text-xs text-stone-500">
                  From: <strong className="text-stone-700 dark:text-stone-300">{m.name}</strong> ({m.email} {m.phone ? `• ${m.phone}` : ''})
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    m.status === 'REPLIED'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {m.status}
                </span>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl">
              "{m.message}"
            </p>

            {m.adminReply && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">
                  Atelier Master Reply:
                </span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{m.adminReply}</p>
                <span className="text-[10px] text-stone-400 block mt-1">
                  Sent on {new Date(m.repliedAt || m.updatedAt).toLocaleString()}
                </span>
              </div>
            )}

            {activeReplyId === m._id ? (
              <div className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official boutique reply..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-xs"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setActiveReplyId(null)}
                    className="py-1.5 px-3 rounded-lg border text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendReply(m._id)}
                    className="py-1.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => {
                    setActiveReplyId(m._id);
                    setReplyText('');
                  }}
                  className="py-1.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300"
                >
                  {m.adminReply ? 'Update Reply' : 'Reply to Customer'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

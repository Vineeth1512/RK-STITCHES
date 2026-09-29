import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { Users, Search, Phone, Mail, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function AdminCustomers() {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    try {
      const res = await api.get('/users/customers');
      setCustomers(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/users/customers/${id}/toggle-status`);
      dispatch(addToast({ message: res.data?.message || 'Status updated', type: 'info' }));
      loadCustomers();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update customer status', type: 'error' }));
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Customer Directory
          </h1>
          <p className="text-xs text-stone-500">Registered customers, contact profiles, and account controls</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border-none text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700 dark:text-stone-300">
            <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-500 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Joined On</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((c) => (
                <tr key={c._id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                  <td className="p-4 font-bold text-stone-900 dark:text-white flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs uppercase">
                      {c.name[0]}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(c._id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold ${
                        c.status === 'ACTIVE'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40'
                      }`}
                    >
                      {c.status === 'ACTIVE' ? 'Disable Account' : 'Activate Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

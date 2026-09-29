import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import { User, Phone, Mail, MapPin, Lock, Save } from 'lucide-react';

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || '');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Hyderabad');
  const [pincode, setPincode] = useState(user?.addresses?.[0]?.pincode || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const addresses = [{ street, city, state: 'Telangana', pincode, isDefault: true }];
      const res = await api.patch('/auth/profile', {
        name,
        phone,
        addresses
      });
      dispatch(updateUser(res.data?.data));
      dispatch(addToast({ message: 'Profile updated successfully!', type: 'success' }));
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update profile', type: 'error' }));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    setChangingPass(true);
    try {
      await api.patch('/auth/change-password', {
        currentPassword,
        newPassword
      });
      dispatch(addToast({ message: 'Password changed successfully!', type: 'success' }));
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      dispatch(addToast({
        message: err.response?.data?.message || 'Password update failed',
        type: 'error'
      }));
    } finally {
      setChangingPass(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
          My Profile & Settings
        </h1>
        <p className="text-xs text-stone-500">Manage your contact details and default delivery address</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Info Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold">Personal Information</h2>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Email Address (Read Only)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-sm text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Default Delivery Address
              </h3>
              <div>
                <input
                  type="text"
                  placeholder="Street / Flat / Landmark"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingProfile ? 'Saving...' : 'Update Profile Details'}</span>
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold">Security & Password</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Keep your customer account secure by updating your password periodically.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={changingPass}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 font-semibold text-xs disabled:opacity-50"
              >
                {changingPass ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}

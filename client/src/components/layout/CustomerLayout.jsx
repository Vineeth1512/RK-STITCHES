import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';
import ToastContainer from '../common/ToastContainer';
import {
  Scissors,
  LayoutDashboard,
  Calendar,
  Ruler,
  Heart,
  Bell,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function CustomerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Bookings & Tracker', path: '/dashboard/bookings', icon: Calendar },
    { name: 'Saved Measurements', path: '/dashboard/measurements', icon: Ruler },
    { name: 'My Wishlist', path: '/dashboard/wishlist', icon: Heart },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'My Profile & Addresses', path: '/dashboard/profile', icon: User },
    { name: 'Account Settings', path: '/dashboard/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Scissors className="w-4 h-4 rotate-45" />
          </div>
          <span className="font-serif font-bold text-lg text-stone-900 dark:text-white">RK STITCHES</span>
        </Link>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg text-stone-600 dark:text-stone-300"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-stone-700 dark:text-stone-300"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-amber-600 flex items-center justify-center text-white shadow-md">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl leading-tight">RK STITCHES</h1>
              <p className="text-[10px] uppercase tracking-wider text-brand-600 dark:text-amber-400 font-semibold">
                Customer Studio
              </p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-stone-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Mini Profile */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm uppercase flex-shrink-0">
            {user?.name ? user.name[0] : 'C'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-stone-900 dark:text-stone-100">{user?.name}</p>
            <p className="text-xs text-stone-500 truncate">{user?.phone || user?.email}</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </>
                )}
              </NavLink>
            );
          })}

          {['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user?.role) && (
            <div className="pt-3">
              <Link
                to="/admin"
                className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Go to Admin Portal</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-stone-500">Theme</span>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
}

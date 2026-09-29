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
  Users,
  Sparkles,
  Image,
  Video,
  Star,
  MessageSquare,
  Tag,
  HelpCircle,
  Settings,
  BarChart3,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard: Verify Admin Role
  const isAuthorized = user && ['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user.role);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold">Access Restricted</h2>
          <p className="text-sm text-stone-500">
            You do not have staff or administrator privileges to view this portal. Please log in with authorized credentials.
          </p>
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              to="/login"
              className="py-2.5 px-4 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
            >
              Log in as Admin
            </Link>
            <Link
              to="/"
              className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Bookings & Orders', path: '/admin/bookings', icon: Calendar },
    { name: 'Tailoring Services', path: '/admin/services', icon: Scissors },
    { name: 'Fashion Designs', path: '/admin/designs', icon: Sparkles },
    { name: 'Lookbook Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Video Showcase', path: '/admin/videos', icon: Video },
    { name: 'Customer Directory', path: '/admin/customers', icon: Users },
    { name: 'Reviews Moderation', path: '/admin/reviews', icon: Star },
    { name: 'Coupons & Promos', path: '/admin/coupons', icon: Tag },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Manage FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Boutique Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-lg">RK Admin</span>
        </div>
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

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-lg">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-white leading-tight">RK STITCHES</h1>
              <p className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                Admin Management
              </p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-stone-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Badge */}
        <div className="p-3 mx-4 my-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">
              {user?.role}
            </span>
          </div>
          <Link
            to="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-300 hover:text-white"
            title="View Live Store"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-stone-400">Appearance</span>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
}

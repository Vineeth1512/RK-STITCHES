import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';
import { openSearch } from '../../store/slices/uiSlice';
import {
  Scissors,
  Sun,
  Moon,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  Calendar,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Custom Stitching', path: '/custom-stitching', highlight: true },
    { name: 'Maggam Work', path: '/maggam-work' },
    { name: 'Designs', path: '/designs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Videos', path: '/videos' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-amber-700 text-amber-50 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 inline animate-pulse" />
        <span>Wedding & Festive Stitching Slots Open! Express 48-Hour Delivery Available.</span>
        <Link to="/custom-stitching" className="underline font-semibold hover:text-white ml-1">Book Today →</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Monogram */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Scissors className="w-6 h-6 rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                RK STITCHES
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-600 dark:text-amber-400 -mt-1">
                Bespoke Tailoring Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-brand-600 dark:text-amber-400 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                  } ${link.highlight ? 'text-brand-700 dark:text-amber-300' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-600 dark:bg-amber-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => dispatch(openSearch())}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors"
              title="Search Services, Designs & FAQs"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to={isAuthenticated ? "/dashboard/wishlist" : "/login"}
              className="p-2 relative text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors"
              title="Saved Designs & Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-brand-600 text-white rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-transform active:scale-95"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 rotate-0 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700 rotate-0 transition-transform" />
              )}
            </button>

            {/* User Dropdown or Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pl-2 pr-3 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brand-500 bg-stone-100/50 dark:bg-stone-900/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 hidden sm:inline max-w-[90px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 py-2 z-50 animate-slide-up"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                      <p className="text-xs text-stone-400">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-900 dark:text-white truncate">{user?.name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                        {user?.role}
                      </span>
                    </div>

                    {['ADMIN', 'SUPER_ADMIN', 'STAFF'].includes(user?.role) ? (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2.5 text-amber-500" />
                        Admin Dashboard
                      </Link>
                    ) : null}

                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Layers className="w-4 h-4 mr-2.5 text-brand-500" />
                      Customer Dashboard
                    </Link>

                    <Link
                      to="/dashboard/bookings"
                      className="flex items-center px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2.5 text-emerald-500" />
                      My Bookings & Tracker
                    </Link>

                    <Link
                      to="/dashboard/measurements"
                      className="flex items-center px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Scissors className="w-4 h-4 mr-2.5 text-indigo-500" />
                      Saved Measurements
                    </Link>

                    <div className="border-t border-stone-100 dark:border-stone-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors"
              >
                <User className="w-4 h-4 mr-1.5" />
                Sign In
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              to="/custom-stitching"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all"
            >
              Book Stitching
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-4 pt-3 pb-6 space-y-1 animate-slide-up shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col space-y-2">
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-stone-800 dark:text-stone-200"
              >
                Sign In / Register
              </Link>
            )}
            <Link
              to="/custom-stitching"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold"
            >
              Book Custom Stitching
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

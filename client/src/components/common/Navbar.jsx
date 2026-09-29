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

  // Clean, focused desktop navigation links
  const primaryLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Designs', path: '/designs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Full mobile drawer links for complete accessibility
  const mobileLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Services', path: '/services' },
    { name: 'Custom Stitching', path: '/custom-stitching', highlight: true },
    { name: 'Maggam & Aari Work', path: '/maggam-work' },
    { name: 'Designer Lookbook', path: '/designs' },
    { name: 'Real Client Gallery', path: '/gallery' },
    { name: 'Behind the Seams Videos', path: '/videos' },
    { name: 'Pricing & Packages', path: '/pricing' },
    { name: 'About Our Studio', path: '/about' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact & Boutique Location', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-stone-50/95 dark:bg-stone-950/95 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Monogram */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
                RK STITCHES
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-brand-600 dark:text-amber-400 -mt-1 whitespace-nowrap hidden xs:inline">
                Bespoke Tailoring Studio
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-brand-600 dark:text-amber-400 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`
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

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            
            {/* Search Trigger */}
            <button
              onClick={() => dispatch(openSearch())}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors"
              title="Search Services, Designs & FAQs"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist (Desktop) */}
            <Link
              to={isAuthenticated ? "/dashboard/wishlist" : "/login"}
              className="hidden sm:inline-flex p-2 relative text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors"
              title="Saved Designs & Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-brand-600 text-white rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-transform active:scale-95"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700" />
              )}
            </button>

            {/* User Dropdown or Login (Desktop) */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 p-1.5 pl-2 pr-2.5 rounded-full border border-stone-200 dark:border-stone-800 hover:border-brand-500 bg-stone-100/50 dark:bg-stone-900/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 hidden md:inline max-w-[80px] truncate">
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
                        className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2.5 text-amber-500" />
                        Admin Studio
                      </Link>
                    ) : null}

                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Layers className="w-4 h-4 mr-2.5 text-brand-500" />
                      Customer Dashboard
                    </Link>

                    <Link
                      to="/dashboard/bookings"
                      className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2.5 text-emerald-500" />
                      My Bookings & Tracker
                    </Link>

                    <Link
                      to="/dashboard/measurements"
                      className="flex items-center px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
                className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors whitespace-nowrap"
              >
                <User className="w-4 h-4 mr-1.5 text-stone-500" />
                Sign In
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              to="/custom-stitching"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white shadow-md shadow-brand-500/20 active:scale-95 transition-all whitespace-nowrap"
            >
              <span>Book Stitching</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 animate-slide-up shadow-2xl">
          {mobileLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                link.highlight
                  ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-amber-400 font-semibold'
                  : 'text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col space-y-2">
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-sm text-stone-800 dark:text-stone-200"
              >
                Sign In / Register
              </Link>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-sm text-stone-800 dark:text-stone-200"
              >
                My Account & Orders
              </Link>
            )}
            <Link
              to="/custom-stitching"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold text-sm shadow-md"
            >
              Book Custom Stitching
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

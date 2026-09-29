import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Scissors, Calendar, Heart, User } from 'lucide-react';

export default function MobileBottomNav() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Scissors },
    { name: 'Book Now', path: '/custom-stitching', icon: Calendar, highlight: true },
    { name: 'Wishlist', path: isAuthenticated ? '/dashboard/wishlist' : '/login', icon: Heart, badge: wishlistCount },
    { name: 'Account', path: isAuthenticated ? '/dashboard' : '/login', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 lg:hidden px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-brand-600 dark:text-amber-400 font-semibold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                } ${item.highlight ? '-mt-4 bg-gradient-to-tr from-brand-600 to-amber-600 text-white rounded-full p-3 shadow-lg shadow-brand-500/30' : ''}`
              }
            >
              <div className="relative">
                <Icon className={item.highlight ? 'w-5 h-5 text-white' : 'w-5 h-5'} />
                {item.badge > 0 && !item.highlight && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {!item.highlight && (
                <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

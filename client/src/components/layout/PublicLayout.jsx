import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import MobileBottomNav from '../common/MobileBottomNav';
import WhatsAppFloatingBtn from '../common/WhatsAppFloatingBtn';
import ToastContainer from '../common/ToastContainer';
import SearchModal from '../common/SearchModal';
import VideoPlayerModal from '../common/VideoPlayerModal';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-200 w-full">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppFloatingBtn />
      <ToastContainer />
      <SearchModal />
      <VideoPlayerModal />
    </div>
  );
}

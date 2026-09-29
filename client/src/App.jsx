import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist } from './store/slices/wishlistSlice';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import ServiceDetail from './pages/public/ServiceDetail';
import Gallery from './pages/public/Gallery';
import Designs from './pages/public/Designs';
import Pricing from './pages/public/Pricing';
import CustomStitching from './pages/public/CustomStitching';
import MaggamWork from './pages/public/MaggamWork';
import Uniforms from './pages/public/Uniforms';
import BlouseDesigns from './pages/public/BlouseDesigns';
import LehengaDesigns from './pages/public/LehengaDesigns';
import Frocks from './pages/public/Frocks';
import Kurtis from './pages/public/Kurtis';
import Testimonials from './pages/public/Testimonials';
import Videos from './pages/public/Videos';
import Contact from './pages/public/Contact';
import FAQPage from './pages/public/FAQPage';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsConditions from './pages/public/TermsConditions';
import NotFound from './pages/public/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerBookings from './pages/customer/CustomerBookings';
import CustomerBookingDetail from './pages/customer/CustomerBookingDetail';
import CustomerMeasurements from './pages/customer/CustomerMeasurements';
import CustomerWishlist from './pages/customer/CustomerWishlist';
import CustomerNotifications from './pages/customer/CustomerNotifications';
import CustomerProfile from './pages/customer/CustomerProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminServices from './pages/admin/AdminServices';
import AdminDesigns from './pages/admin/AdminDesigns';
import AdminGallery from './pages/admin/AdminGallery';
import AdminVideos from './pages/admin/AdminVideos';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Sync wishlist with server whenever authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/custom-stitching" element={<CustomStitching />} />
        <Route path="/maggam-work" element={<MaggamWork />} />
        <Route path="/uniforms" element={<Uniforms />} />
        <Route path="/blouse-designs" element={<BlouseDesigns />} />
        <Route path="/lehenga-designs" element={<LehengaDesigns />} />
        <Route path="/frocks" element={<Frocks />} />
        <Route path="/kurtis" element={<Kurtis />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Customer Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="bookings" element={<CustomerBookings />} />
        <Route path="bookings/:id" element={<CustomerBookingDetail />} />
        <Route path="measurements" element={<CustomerMeasurements />} />
        <Route path="wishlist" element={<CustomerWishlist />} />
        <Route path="notifications" element={<CustomerNotifications />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="settings" element={<CustomerProfile />} />
      </Route>

      {/* Admin Protected Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="designs" element={<AdminDesigns />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

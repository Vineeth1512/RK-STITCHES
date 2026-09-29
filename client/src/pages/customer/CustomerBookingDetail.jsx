import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Scissors,
  Ruler,
  MessageCircle,
  ArrowLeft,
  AlertTriangle,
  XCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export default function CustomerBookingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/bookings/${id}`)
      .then((res) => setBooking(res.data?.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this stitching order?')) return;
    try {
      const res = await api.post(`/bookings/${id}/cancel`, {
        reason: 'Customer initiated cancellation'
      });
      setBooking(res.data?.data);
      dispatch(addToast({ message: 'Booking has been cancelled', type: 'info' }));
    } catch (err) {
      dispatch(addToast({ message: 'Failed to cancel booking', type: 'error' }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-stone-500">Loading order tracker...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p>Order not found</p>
        <Link to="/dashboard/bookings" className="text-xs text-brand-600 font-semibold underline">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  // Master tracking workflow steps
  const trackingMilestones = [
    { key: 'PENDING', label: 'Booking Created', desc: 'Request submitted online' },
    { key: 'CONFIRMED', label: 'Booking Confirmed', desc: 'Fabric & design verified' },
    { key: 'MEASUREMENTS_REQUIRED', label: 'Measurements Checked', desc: 'Pattern drafted by master tailor' },
    { key: 'IN_PROGRESS', label: 'Stitching Started', desc: 'Cutting, sewing & embroidery' },
    { key: 'READY', label: 'Quality Check & Ready', desc: 'Inspected and ready for trial/dispatch' },
    { key: 'COMPLETED', label: 'Delivered', desc: 'Order successfully completed' }
  ];

  const getMilestoneIndex = (status) => {
    if (status === 'CANCELLED') return -1;
    const index = trackingMilestones.findIndex((m) => m.key === status);
    return index >= 0 ? index : 0;
  };

  const currentMilestoneIdx = getMilestoneIndex(booking.status);

  const whatsappMessage = `Hello RK Stitches! I have a question regarding my stitching order #${booking.bookingNumber} (${booking.clothingType}).`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <Link
          to="/dashboard/bookings"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-brand-600"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to All Orders</span>
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Master Tailor on WhatsApp</span>
        </a>
      </div>

      {/* Main Order Header Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
          <div>
            <span className="font-mono text-xs font-bold text-brand-600 dark:text-amber-400">
              #{booking.bookingNumber}
            </span>
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white mt-1">
              {booking.clothingType}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Target Delivery: <strong>{new Date(booking.requiredDate).toLocaleDateString()}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-stone-400 uppercase font-semibold">Current Status</span>
            <div className="text-xl font-bold text-brand-700 dark:text-amber-400 mt-0.5">
              {booking.status.replace(/_/g, ' ')}
            </div>
            {booking.assignedStaff && booking.assignedStaff !== 'Unassigned' && (
              <p className="text-xs text-stone-500 mt-0.5">Assigned to: {booking.assignedStaff}</p>
            )}
          </div>
        </div>

        {/* VISUAL ORDER TRACKER TIMELINE */}
        <div className="py-6">
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-6">
            Visual Tailoring Journey
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
            {trackingMilestones.map((step, idx) => {
              const isPast = currentMilestoneIdx > idx;
              const isCurrent = currentMilestoneIdx === idx;
              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 animate-pulse'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <div>
                    <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-brand-600 dark:text-amber-400' : 'text-stone-800 dark:text-stone-200'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Timeline Log */}
        {booking.timeline && booking.timeline.length > 0 && (
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Live Tailor Activity Log:
            </h4>
            <div className="space-y-3 text-xs">
              {booking.timeline.map((event, i) => (
                <div key={i} className="flex items-start space-x-3 pb-2 border-b border-stone-200/60 dark:border-stone-700/40 last:border-none">
                  <Clock className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800 dark:text-stone-200">{event.title}</span>
                      <span className="text-[10px] text-stone-400">{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                    {event.note && (
                      <p className="text-stone-600 dark:text-stone-400 mt-0.5">{event.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two Column Section: Measurements & Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Measurements Snapshot */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Ruler className="w-5 h-5 text-brand-600" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Measurements Applied
            </h3>
          </div>

          {booking.measurementsSnapshot && Object.keys(booking.measurementsSnapshot).length > 0 ? (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Shoulder</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.shoulder || 0}"</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Chest / Bust</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.chest || 0}"</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Waist</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.waist || 0}"</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Sleeve Length</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.sleeveLength || 0}"</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Front Neck Depth</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.frontNeckDepth || 0}"</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80">
                <span className="text-stone-400">Back Neck Depth</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">{booking.measurementsSnapshot.backNeckDepth || 0}"</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">Sample garment provided directly to boutique.</p>
          )}

          {booking.additionalInstructions && (
            <div className="pt-2 text-xs">
              <span className="font-semibold text-stone-700 dark:text-stone-300">Special Notes: </span>
              <p className="text-stone-500 mt-1 italic leading-relaxed">{booking.additionalInstructions}</p>
            </div>
          )}
        </div>

        {/* Fabric & Delivery Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <Scissors className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Garment & Delivery Specifications
              </h3>
            </div>

            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <p><span className="font-semibold">Fabric Status: </span>{booking.fabricStatus === 'CUSTOMER_PROVIDED' ? 'Customer Provided Material' : 'Sourced by Boutique'}</p>
              {booking.fabricDetails && (
                <p><span className="font-semibold">Fabric Details: </span>{booking.fabricDetails}</p>
              )}
              {booking.color && (
                <p><span className="font-semibold">Color: </span>{booking.color}</p>
              )}
              <p><span className="font-semibold">Pickup Mode: </span>{booking.pickupType === 'HOME_DELIVERY' ? 'Doorstep Delivery' : 'Boutique Fitting & Pickup'}</p>
            </div>

            {/* Reference Photos */}
            {booking.referencePhotos && booking.referencePhotos.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold block mb-2">Attached Reference Photos:</span>
                <div className="flex gap-2">
                  {booking.referencePhotos.map((url, i) => (
                    <img key={i} src={url} alt="Ref" className="w-16 h-16 rounded-xl object-cover border" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {booking.status === 'PENDING' && (
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleCancelBooking}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors"
              >
                Cancel This Booking
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

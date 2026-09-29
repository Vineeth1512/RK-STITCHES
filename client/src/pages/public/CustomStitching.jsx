import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import {
  Scissors,
  Calendar,
  Ruler,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
  Tag,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import ImageUpload from '../../components/common/ImageUpload';

export default function CustomStitching() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const initialClothing = searchParams.get('clothingType') || 'Blouse';
  const initialService = searchParams.get('service') || '';
  const initialDesign = searchParams.get('design') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerPhone: user?.phone || '',
    customerEmail: user?.email || '',
    clothingType: initialClothing,
    serviceName: initialService || 'Custom Tailoring',
    preferredDesign: initialDesign,
    fabricStatus: 'CUSTOMER_PROVIDED',
    fabricDetails: '',
    color: '',
    quantity: 1,
    requiredDate: '',
    pickupType: 'BOUTIQUE_PICKUP',
    deliveryAddress: {
      street: user?.addresses?.[0]?.street || '',
      city: 'Hyderabad',
      pincode: user?.addresses?.[0]?.pincode || ''
    },
    // Measurements
    measurementChoice: 'SAVED', // SAVED, MANUAL, SAMPLE_GARMENT
    savedProfileId: '',
    measurementsSnapshot: {
      shoulder: 14.5,
      chest: 36,
      waist: 30,
      hip: 38,
      sleeveLength: 10,
      armhole: 16,
      blouseLength: 14,
      dressLength: 52,
      frontNeckDepth: 6.5,
      backNeckDepth: 8.5,
      neckType: 'Princess Cut / U-Neck'
    },
    additionalInstructions: '',
    referencePhotos: [],
    photoUrlInput: '',
    couponCode: '',
    discount: 0
  });

  // Load user saved measurements if logged in
  useEffect(() => {
    if (isAuthenticated) {
      setLoadingProfiles(true);
      api.get('/measurements/my')
        .then((res) => {
          const profiles = res.data?.data || [];
          setSavedProfiles(profiles);
          if (profiles.length > 0) {
            setFormData((prev) => ({
              ...prev,
              savedProfileId: profiles[0]._id,
              measurementChoice: 'SAVED'
            }));
          } else {
            setFormData((prev) => ({ ...prev, measurementChoice: 'MANUAL' }));
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingProfiles(false));
    } else {
      setFormData((prev) => ({ ...prev, measurementChoice: 'MANUAL' }));
    }

    // Load services list
    api.get('/services').then((res) => {
      setServices(res.data?.data || []);
    });
  }, [isAuthenticated]);

  // Set default minimum date to 3 days from now
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    setFormData((prev) => ({
      ...prev,
      requiredDate: prev.requiredDate || d.toISOString().split('T')[0]
    }));
  }, []);

  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) return;
    try {
      const res = await api.post('/coupons/validate', {
        code: formData.couponCode,
        amount: 2500
      });
      setFormData((prev) => ({
        ...prev,
        discount: res.data?.data?.calculatedDiscount || 0
      }));
      dispatch(addToast({ message: 'Promo coupon applied successfully!', type: 'success' }));
    } catch (err) {
      dispatch(addToast({
        message: err.response?.data?.message || 'Invalid or expired coupon code',
        type: 'error'
      }));
    }
  };

  const handleAddPhotoUrl = () => {
    if (!formData.photoUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      referencePhotos: [...prev.referencePhotos, prev.photoUrlInput.trim()],
      photoUrlInput: ''
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      referencePhotos: prev.referencePhotos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.requiredDate) {
      dispatch(addToast({ message: 'Please complete all required contact details and delivery date', type: 'warning' }));
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        clothingType: formData.clothingType,
        serviceName: formData.serviceName,
        preferredDesign: formData.preferredDesign,
        savedMeasurementProfile: formData.measurementChoice === 'SAVED' ? formData.savedProfileId : null,
        measurementsSnapshot: formData.measurementsSnapshot,
        fabricStatus: formData.fabricStatus,
        fabricDetails: formData.fabricDetails,
        color: formData.color,
        quantity: formData.quantity,
        requiredDate: formData.requiredDate,
        additionalInstructions: formData.additionalInstructions,
        referencePhotos: formData.referencePhotos,
        pickupType: formData.pickupType,
        deliveryAddress: formData.deliveryAddress
      };

      const res = await api.post('/bookings', payload);
      setBookingSuccess(res.data?.data);
      dispatch(addToast({ message: 'Custom stitching booking submitted successfully!', type: 'success' }));
    } catch (err) {
      console.error('Booking submission error:', err);
      dispatch(addToast({
        message: err.response?.data?.message || 'Failed to submit booking. Please try again.',
        type: 'error'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
          Booking Confirmed!
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
          Thank you for choosing RK Stitches, <span className="font-semibold">{bookingSuccess.customerName}</span>. Your custom stitching order has been received by our master atelier.
        </p>

        {/* Booking Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl max-w-md mx-auto text-left space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-xs text-stone-400 uppercase font-semibold">Booking ID</span>
            <span className="font-mono text-base font-bold text-brand-600 dark:text-amber-400">
              {bookingSuccess.bookingNumber}
            </span>
          </div>
          <div className="text-xs space-y-1.5 text-stone-600 dark:text-stone-300">
            <p><span className="font-semibold text-stone-900 dark:text-white">Item: </span>{bookingSuccess.clothingType}</p>
            <p><span className="font-semibold text-stone-900 dark:text-white">Required Date: </span>{new Date(bookingSuccess.requiredDate).toLocaleDateString()}</p>
            <p><span className="font-semibold text-stone-900 dark:text-white">Pickup Mode: </span>{bookingSuccess.pickupType === 'HOME_DELIVERY' ? 'Home Delivery' : 'Boutique Pickup'}</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to={`/dashboard/bookings/${bookingSuccess._id}`}
              className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              Track Order Status Online →
            </Link>
          ) : (
            <Link
              to={`/login`}
              className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              Sign In to Save & Track Order
            </Link>
          )}

          <a
            href={`https://wa.me/919876543210?text=Hello%20RK%20Stitches%2C%20I%20have%20submitted%20booking%20${bookingSuccess.bookingNumber}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
          >
            Chat with Master Tailor on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Garment & Fabric' },
    { num: 2, title: 'Measurements' },
    { num: 3, title: 'Photos & Details' },
    { num: 4, title: 'Review & Submit' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-amber-400">
          Made-To-Measure Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white">
          Book Custom Stitching
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Share your style preferences, provide your measurements, and let our master craftsmen bring your outfit to life.
        </p>
      </div>

      {/* Stepper Bar */}
      <div className="flex items-center justify-between max-w-2xl mx-auto px-2">
        {steps.map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= s.num
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                }`}
              >
                {s.num}
              </div>
              <span className="text-[11px] font-medium mt-1 text-stone-600 dark:text-stone-400 text-center hidden sm:block">
                {s.title}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  currentStep > s.num ? 'bg-brand-600' : 'bg-stone-200 dark:bg-stone-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl">
        <form onSubmit={handleSubmitBooking} className="space-y-8">
          
          {/* STEP 1: Garment & Fabric */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                1. Select Garment & Fabric Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Garment Type *
                  </label>
                  <select
                    value={formData.clothingType}
                    onChange={(e) => setFormData({ ...formData, clothingType: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Blouse">Blouse (Padded / Princess Cut / Normal)</option>
                    <option value="Maggam Work Blouse">Maggam & Aari Work Blouse</option>
                    <option value="Lehenga / Choli">Bridal / Festive Lehenga & Choli</option>
                    <option value="Long Frock">Long Frock / Gown</option>
                    <option value="Kurti / Salwar">Kurti / Salwar Suit Set</option>
                    <option value="Langa Blouse (Pattu Pavada)">Traditional Langa Blouse (Pattu Pavada)</option>
                    <option value="School / College Uniform">School / College Uniform</option>
                    <option value="Western Dress">Western / Indo-Western Dress</option>
                    <option value="Kids Wear">Kids Ethnic / Party Wear</option>
                    <option value="Custom Design / Other">Custom Pattern / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Associated Service
                  </label>
                  <input
                    type="text"
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    placeholder="e.g. Blouse Stitching, Maggam Work"
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm"
                  />
                </div>
              </div>

              {formData.preferredDesign && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between">
                  <span>Selected Design Reference: <strong>{formData.preferredDesign}</strong></span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredDesign: '' })}
                    className="text-stone-400 hover:text-stone-600 underline"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Fabric Provision
                  </label>
                  <select
                    value={formData.fabricStatus}
                    onChange={(e) => setFormData({ ...formData, fabricStatus: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm"
                  >
                    <option value="CUSTOMER_PROVIDED">I will provide my own fabric / saree</option>
                    <option value="PURCHASE_REQUESTED">I need RK Stitches to source pure fabric</option>
                    <option value="NEED_ASSISTANCE">I need fabric selection guidance from the tailor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Outfit Color / Combination
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g., Royal Blue body with Gold Zari border"
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Fabric Description & Type
                </label>
                <textarea
                  rows={2}
                  value={formData.fabricDetails}
                  onChange={(e) => setFormData({ ...formData, fabricDetails: e.target.value })}
                  placeholder="e.g., Pure Kanjeevaram silk saree with heavy pallu to be converted into lehenga choli."
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center space-x-2 shadow-md"
                >
                  <span>Continue to Measurements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Measurements */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                2. Measurements & Fitting Preferences
              </h3>

              {/* Measurement Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, measurementChoice: 'SAVED' })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      formData.measurementChoice === 'SAVED'
                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30'
                        : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span className="font-semibold text-sm block">Saved Profile</span>
                    <span className="text-xs text-stone-500">Reuse saved measurements</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, measurementChoice: 'MANUAL' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.measurementChoice === 'MANUAL'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <span className="font-semibold text-sm block">Enter Custom Values</span>
                  <span className="text-xs text-stone-500">Provide measurements (inches)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, measurementChoice: 'SAMPLE_GARMENT' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.measurementChoice === 'SAMPLE_GARMENT'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/30'
                      : 'border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <span className="font-semibold text-sm block">Provide Sample Garment</span>
                  <span className="text-xs text-stone-500">Hand over your best-fit outfit</span>
                </button>
              </div>

              {/* Sub-section: Saved Profile Select */}
              {formData.measurementChoice === 'SAVED' && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Choose Saved Profile:
                  </label>
                  {savedProfiles.length > 0 ? (
                    <select
                      value={formData.savedProfileId}
                      onChange={(e) => setFormData({ ...formData, savedProfileId: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm"
                    >
                      {savedProfiles.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.profileTitle} ({p.clothingType} - Chest: {p.chest}", Waist: {p.waist}")
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-xs text-stone-500">No saved profiles found. Please enter values below.</p>
                  )}
                </div>
              )}

              {/* Sub-section: Manual Inputs */}
              {(formData.measurementChoice === 'MANUAL' || formData.measurementChoice === 'SAVED') && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Body Measurements (Inches)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-stone-500">Shoulder</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.shoulder}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              shoulder: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Chest / Bust</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.chest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              chest: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Waist</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.waist}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              waist: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Sleeve Length</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.sleeveLength}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              sleeveLength: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Armhole</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.armhole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              armhole: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Blouse Length</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.blouseLength}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              blouseLength: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Front Neck</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.frontNeckDepth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              frontNeckDepth: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500">Back Neck</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.measurementsSnapshot.backNeckDepth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurementsSnapshot: {
                              ...formData.measurementsSnapshot,
                              backNeckDepth: parseFloat(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.measurementChoice === 'SAMPLE_GARMENT' && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  You can hand over your well-fitting sample blouse or dress when delivering your fabric at our boutique or handing it to our pickup rider.
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-3 px-6 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-3 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center space-x-2 shadow-md"
                >
                  <span>Continue to Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Reference Photos & Instructions */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                3. Design Photos & Special Notes
              </h3>

              <div>
                <ImageUpload
                  label="Upload Reference Outfit or Neckline Photo"
                  value=""
                  onChange={(url) => {
                    if (url) {
                      setFormData((prev) => ({
                        ...prev,
                        referencePhotos: [...prev.referencePhotos, url]
                      }));
                      dispatch(addToast({ message: 'Reference photo added!', type: 'success' }));
                    }
                  }}
                  placeholder="Or paste Pinterest/Instagram image link"
                />
              </div>

              {formData.referencePhotos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-stone-500 font-semibold">Attached Reference Photos:</p>
                  <div className="flex flex-wrap gap-3">
                    {formData.referencePhotos.map((url, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 group">
                        <img src={url} alt="Ref" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(i)}
                          className="absolute inset-0 bg-rose-900/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Additional Tailoring Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalInstructions}
                  onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
                  placeholder="e.g., Padded cups with sweetheart neck, high back dori with latkans, keep 2 inches margin inside."
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-6 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="py-3 px-8 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm flex items-center space-x-2 shadow-md"
                >
                  <span>Review & Final Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Contact, Date & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                4. Contact Information & Completion Date
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Required Delivery / Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.requiredDate}
                    onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                    Pickup / Delivery Mode
                  </label>
                  <select
                    value={formData.pickupType}
                    onChange={(e) => setFormData({ ...formData, pickupType: e.target.value })}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  >
                    <option value="BOUTIQUE_PICKUP">Boutique Trial & Pickup (Banjara Hills)</option>
                    <option value="HOME_DELIVERY">Doorstep Delivery (Hyderabad)</option>
                  </select>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Have a Promo Coupon?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10, BRIDAL500"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                    className="w-48 p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm font-mono uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold"
                  >
                    Apply Coupon
                  </button>
                  {formData.discount > 0 && (
                    <span className="text-xs font-bold text-emerald-600 self-center">
                      -₹{formData.discount} Applied!
                    </span>
                  )}
                </div>
              </div>

              {/* Summary Review Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs space-y-1">
                <p><span className="font-semibold">Outfit:</span> {formData.clothingType}</p>
                <p><span className="font-semibold">Fabric:</span> {formData.fabricStatus === 'CUSTOMER_PROVIDED' ? 'Provided by You' : 'Sourced by Boutique'}</p>
                <p><span className="font-semibold">Target Delivery:</span> {formData.requiredDate}</p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-3 px-6 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-4 px-10 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white font-bold text-sm shadow-xl shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Order...' : 'Confirm & Submit Stitching Booking'}
                </button>
              </div>
            </div>
          )}

        </form>
      </div>

    </div>
  );
}

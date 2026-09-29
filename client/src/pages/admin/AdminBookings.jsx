import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/uiSlice';
import api from '../../services/api';
import {
  Calendar,
  Search,
  Filter,
  Clock,
  Edit2,
  CheckCircle2,
  User,
  Phone,
  Ruler,
  X,
  Sparkles
} from 'lucide-react';

export default function AdminBookings() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeBooking, setActiveBooking] = useState(null);

  // Status update modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [note, setNote] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [advancePaid, setAdvancePaid] = useState(0);
  const [updating, setUpdating] = useState(false);

  const loadBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const openStatusModal = (booking) => {
    setActiveBooking(booking);
    setNewStatus(booking.status);
    setNote('');
    setAssignedStaff(booking.assignedStaff || 'Master Ramesh');
    setEstimatedCost(booking.estimatedCost || 0);
    setAdvancePaid(booking.advancePaid || 0);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!activeBooking) return;

    setUpdating(true);
    try {
      await api.patch(`/bookings/${activeBooking._id}/status`, {
        status: newStatus,
        note,
        assignedStaff,
        estimatedCost,
        advancePaid
      });
      dispatch(addToast({ message: `Order updated to ${newStatus}`, type: 'success' }));
      setModalOpen(false);
      loadBookings();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update order status', type: 'error' }));
    } finally {
      setUpdating(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesSearch =
      b.bookingNumber?.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone?.includes(search) ||
      b.clothingType?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">
            Custom Stitching Order Workflow
          </h1>
          <p className="text-xs text-stone-500">
            Inspect customer specifications, update tailoring status, and assign master staff
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by order #, phone, or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border-none text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
          {['ALL', 'PENDING', 'CONFIRMED', 'MEASUREMENTS_REQUIRED', 'IN_PROGRESS', 'READY', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table / Cards */}
      {/* Orders Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto relative">
          <table className="w-full text-left text-xs text-stone-700 dark:text-stone-300 border-separate border-spacing-0">
            <thead className="bg-stone-50 dark:bg-stone-800/90 text-stone-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 w-[22%] min-w-[130px]">
                  Order & Garment
                </th>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 w-[20%] min-w-[130px]">
                  Customer
                </th>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 w-[20%] min-w-[120px]">
                  Delivery & Staff
                </th>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 w-[12%] min-w-[80px]">
                  Payment
                </th>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 w-[13%] min-w-[95px]">
                  Status
                </th>
                <th className="py-3.5 px-3 sm:px-4 border-b border-stone-200 dark:border-stone-800 text-center sticky right-0 bg-stone-50 dark:bg-stone-800 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.08)] z-10 w-[13%] min-w-[105px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr
                  key={b._id}
                  onClick={() => openStatusModal(b)}
                  className="hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-colors cursor-pointer group"
                >
                  {/* 1. Order ID & Garment */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block text-xs">
                      #{b.bookingNumber}
                    </span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 text-xs block mt-0.5 truncate max-w-[140px] sm:max-w-none">
                      {b.clothingType}
                    </span>
                    <span className="text-[10px] text-stone-400 capitalize block truncate max-w-[140px] sm:max-w-none">
                      {b.fabricStatus?.toLowerCase()?.replace(/_/g, ' ')}
                    </span>
                  </td>

                  {/* 2. Customer */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60">
                    <p className="font-bold text-stone-900 dark:text-white leading-tight truncate max-w-[130px] sm:max-w-[180px]">
                      {b.customerName}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{b.customerPhone}</p>
                  </td>

                  {/* 3. Delivery & Assigned Staff */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60">
                    <div className="flex items-center space-x-1.5 text-stone-700 dark:text-stone-300 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <span className="whitespace-nowrap">{new Date(b.requiredDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 truncate max-w-[130px] sm:max-w-none">
                      Staff: <span className="text-stone-700 dark:text-stone-200 font-semibold">{b.assignedStaff || 'Unassigned'}</span>
                    </p>
                  </td>

                  {/* 4. Payment */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60 whitespace-nowrap">
                    <p className="font-bold text-stone-900 dark:text-white text-xs">₹{b.estimatedCost || 0}</p>
                    <span className="text-[10px] text-stone-400 block">
                      Adv: ₹{b.advancePaid || 0}
                    </span>
                  </td>

                  {/* 5. Status Badge */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  {/* 6. Action Button (Sticky right-0, always visible) */}
                  <td className="py-3.5 px-3 sm:px-4 border-b border-stone-100 dark:border-stone-800/60 text-center whitespace-nowrap sticky right-0 bg-white dark:bg-stone-900 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 transition-colors shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.08)] z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openStatusModal(b);
                      }}
                      className="inline-flex items-center space-x-1.5 py-1.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Update</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {modalOpen && activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col animate-slide-up max-h-[90vh]">
            <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">
                  #{activeBooking.bookingNumber}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  Update Tailoring Status & Notes
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Order Info Snapshot */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                <p><span className="font-semibold">Customer: </span>{activeBooking.customerName} ({activeBooking.customerPhone})</p>
                <p><span className="font-semibold">Garment: </span>{activeBooking.clothingType}</p>
                {activeBooking.fabricDetails && (
                  <p><span className="font-semibold">Fabric Details: </span>{activeBooking.fabricDetails}</p>
                )}
                {activeBooking.additionalInstructions && (
                  <p><span className="font-semibold">Instructions: </span>{activeBooking.additionalInstructions}</p>
                )}
                {activeBooking.referencePhotos && activeBooking.referencePhotos.length > 0 && (
                  <div className="pt-2">
                    <span className="font-semibold block mb-1">Customer Reference Photos:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeBooking.referencePhotos.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-14 h-14 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 block hover:ring-2 hover:ring-amber-500 transition-all"
                        >
                          <img src={url} alt={`Ref ${idx + 1}`} className="w-full h-full object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Select */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Change Milestone Status:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm font-semibold text-brand-600 dark:text-amber-400"
                >
                  <option value="PENDING">PENDING - Booking Submitted</option>
                  <option value="CONFIRMED">CONFIRMED - Verified by Master Tailor</option>
                  <option value="MEASUREMENTS_REQUIRED">MEASUREMENTS_REQUIRED - Awaiting Dimensions</option>
                  <option value="IN_PROGRESS">IN_PROGRESS - On Sewing Table / Maggam Frame</option>
                  <option value="READY">READY - Inspected & Ready for Trial</option>
                  <option value="COMPLETED">COMPLETED - Delivered & Final Handover</option>
                  <option value="CANCELLED">CANCELLED - Order Voided</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Assign Tailor / Staff
                  </label>
                  <input
                    type="text"
                    value={assignedStaff}
                    onChange={(e) => setAssignedStaff(e.target.value)}
                    placeholder="e.g. Master Ramesh"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Estimated Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Advance Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Tailoring Activity Note (Visible to Customer)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Fabric cutting complete. Hand zardozi work currently underway on the sleeve borders."
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Update & Notify Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

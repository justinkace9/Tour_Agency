import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Calendar, 
  Users, 
  Utensils, 
  MapPin, 
  ZoomIn, 
  ShieldCheck, 
  Clock, 
  FileText, 
  AlertTriangle,
  Send
} from 'lucide-react';
import { BookingDetails } from '../../types/tour';
import { useApp } from '../../context/AppContext';

interface Props {
  booking: BookingDetails;
  onClose: () => void;
}

export const PaymentVerificationModal: React.FC<Props> = ({ booking, onClose }) => {
  const { updateBookingPaymentStatus } = useApp();

  const [isZoomed, setIsZoomed] = useState(false);
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const handleApprove = () => {
    updateBookingPaymentStatus(
      booking.bookingReference, 
      'verified', 
      'Atlantic Bank transfer slip verified by Operator Lead.'
    );
    setActionDoneMsg('Payment verified & booking confirmed! Customer notification dispatched.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionNotes.trim()) return;
    updateBookingPaymentStatus(
      booking.bookingReference, 
      'rejected', 
      undefined, 
      rejectionNotes.trim()
    );
    setActionDoneMsg('Receipt rejected. Clarification request sent to customer chat.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl glass-modal rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-6 text-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  Inspect Atlantic Bank Wire Receipt
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-black/50 border border-[#E0A96D]/40 text-[#E0A96D]">
                  {booking.bookingReference}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Uploaded: {booking.uploadedAt || 'Recent'} · Target Beneficiary: 2110009876
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {actionDoneMsg ? (
          <div className="py-16 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-display text-xl font-bold text-white">{actionDoneMsg}</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Client Details, Tours, Manifest & Pricing */}
            <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1 text-xs">
              
              {/* Client & Pickup Information */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] tracking-wider block">
                  Lead Traveler & Contact
                </span>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">{booking.leadTraveler.fullName}</span>
                  <span className="text-emerald-400 font-mono">{booking.leadTraveler.phone}</span>
                </div>
                <div className="text-slate-400">{booking.leadTraveler.email}</div>
                <div className="flex items-center gap-1.5 pt-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                  <span>Pickup: {booking.pickupLocation}</span>
                </div>
              </div>

              {/* Selected Tours */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] tracking-wider block">
                  Booked Expeditions ({booking.tours.length})
                </span>
                {booking.tours.map(t => (
                  <div key={t.id} className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{t.tourTitle}</span>
                      <span className="font-mono text-white tabular-nums">${t.priceUsd * t.guestsCount} USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <Calendar className="w-3 h-3 text-[#E0A96D]" />
                      <span>{t.selectedDate}</span>
                      <span>·</span>
                      <Users className="w-3 h-3 text-[#E0A96D]" />
                      <span>{t.guestsCount} Guests</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Companions & Dietary Requirements */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#E0A96D] tracking-wider block flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Group Manifest & Dietary Notes</span>
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] p-2 rounded-lg bg-black/20">
                    <span className="text-white font-medium">{booking.leadTraveler.fullName} (Lead)</span>
                    <span className="text-slate-400">Traditional Belizean Rice & Beans</span>
                  </div>
                  {booking.companions.map(c => (
                    <div key={c.id} className="flex justify-between text-[11px] p-2 rounded-lg bg-black/20">
                      <span className="text-white font-medium">{c.fullName} ({c.ageGroup})</span>
                      <span className="text-slate-400">
                        {c.dietaryRestrictions.join(', ') || 'No restrictions'} {c.notes ? `(${c.notes})` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Due & Status */}
              <div className="p-4 rounded-2xl bg-[#0F382C]/50 border border-[#0F382C] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">Required Atlantic Bank Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-white tabular-nums">
                      ${booking.totalBzd} BZD
                    </span>
                    <span className="text-xs text-slate-400">
                      (${booking.totalUsd} USD)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    booking.paymentStatus === 'verified'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                      : booking.paymentStatus === 'rejected'
                      ? 'bg-rose-950 text-rose-400 border border-rose-600'
                      : 'bg-amber-950 text-amber-400 border border-amber-600'
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* BTB Liability Waiver Verification Card */}
              {booking.liabilityWaiver ? (
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BTB Liability Waiver Signed</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(booking.liabilityWaiver.agreedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-white font-medium">
                    Signed by: <strong>{booking.liabilityWaiver.signedName}</strong>
                  </div>
                  {booking.liabilityWaiver.emergencyContact && (
                    <div className="text-[10px] text-slate-300">
                      Emergency: {booking.liabilityWaiver.emergencyContact.name} ({booking.liabilityWaiver.emergencyContact.phone}) · {booking.liabilityWaiver.emergencyContact.relationship}
                    </div>
                  )}
                  {booking.liabilityWaiver.atmAdvisoryAcknowledged && (
                    <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-200 font-semibold border border-emerald-700/50">
                      ATM Cave No-Camera Advisory Acknowledged
                    </span>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                  <span className="font-semibold">Notice:</span> Physical waiver signature will be collected at hotel pickup.
                </div>
              )}

            </div>

            {/* Right Column: High-Resolution Receipt Screenshot Viewer & Action Buttons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#E0A96D]" />
                  <span>Client Transfer Slip Screenshot</span>
                </span>
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="text-xs text-[#E0A96D] hover:underline flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{isZoomed ? 'Reset View' : 'Zoom 150%'}</span>
                </button>
              </div>

              {/* Receipt Preview Box */}
              <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/20 h-72 sm:h-96 flex items-center justify-center group shadow-inner">
                {booking.receiptFileUrl ? (
                  <img
                    src={booking.receiptFileUrl}
                    alt="Atlantic Bank Receipt"
                    className={`object-contain max-h-full transition-transform duration-300 ${
                      isZoomed ? 'scale-150 cursor-grab' : 'scale-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center p-6 text-slate-400">
                    <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                    <span>No receipt image file attached</span>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-[11px] text-slate-300 flex justify-between">
                  <span className="truncate max-w-[200px]">{booking.receiptFileName || 'deposit_receipt.png'}</span>
                  <span className="text-[#E0A96D] font-mono font-bold">Ref: {booking.bookingReference}</span>
                </div>
              </div>

              {/* Approval & Rejection Action Controls */}
              {!showRejectForm ? (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowRejectForm(true)}
                    className="flex-1 py-3 px-4 rounded-xl border border-rose-800 text-rose-300 hover:bg-rose-950/60 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Reject / Request New Receipt</span>
                  </button>

                  <button
                    onClick={handleApprove}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-emerald-500/60 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E0A96D]" />
                    <span>Approve Payment (Confirm Booking)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReject} className="p-4 rounded-2xl bg-black/60 border border-rose-900/50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Reason for Rejection / Correction Request</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowRejectForm(false)}
                      className="text-[10px] text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    required
                    value={rejectionNotes}
                    onChange={(e) => setRejectionNotes(e.target.value)}
                    placeholder="e.g. Amount on slip does not match total, or bank stamp is illegible..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Rejection & Notify Client</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

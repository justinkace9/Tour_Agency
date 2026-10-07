import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { 
  X, 
  Download, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  Utensils, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Share2,
  HardDriveDownload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { saveOfflineVoucher } from '../registerServiceWorker';

export const BookingVoucher: React.FC = () => {
  const { isVoucherOpen, setIsVoucherOpen, currentBooking, currency } = useApp();
  const voucherRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Automatically save voucher to offline cache when opened
  useEffect(() => {
    if (isVoucherOpen && currentBooking) {
      saveOfflineVoucher(currentBooking);
    }
  }, [isVoucherOpen, currentBooking]);

  if (!isVoucherOpen || !currentBooking) return null;

  const downloadVoucherImage = async () => {
    if (!voucherRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(voucherRef.current, {
        scale: 2, // 2x resolution for ultra-sharp crisp text on mobile & print
        useCORS: true,
        backgroundColor: '#0D1117',
        logging: false
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Cayo_EcoTours_Voucher_${currentBooking.bookingReference}.png`;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Voucher download error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Here is my Cayo Eco-Tours Booking Voucher (Ref: ${currentBooking.bookingReference}) for ${currentBooking.leadTraveler.fullName}. Status: Under Review.`
    );
    window.open(`https://wa.me/5016108687?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between pb-3 text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />
            <span className="font-display font-bold text-sm text-white">
              Official Belize Tour Operator Voucher
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366] text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setIsVoucherOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Card Container */}
        <div
          ref={voucherRef}
          className="bg-[#0D1117] rounded-3xl border-2 border-[#E0A96D]/40 p-6 sm:p-8 shadow-2xl text-slate-100 relative overflow-hidden"
          style={{ minHeight: '620px' }}
        >
          {/* Subtle Watermark Branding */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#0F382C]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#E0A96D]/10 blur-3xl pointer-events-none" />

          {/* Voucher Header with Operator Branding */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/15 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/50 flex items-center justify-center text-[#E0A96D] shadow-md shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight">
                  Cayo Eco-Tours Belize
                </h1>
                <span className="text-[11px] text-[#E0A96D] font-medium block">
                  San Ignacio Town · BTB Operator License #BTB-2024-CYO
                </span>
                <span className="text-[10px] text-slate-400 block">
                  #18 Burns Avenue, San Ignacio, Cayo District · Tel: +501 824-2199
                </span>
              </div>
            </div>

            {/* Reference Badge & Payment Status */}
            <div className="text-left sm:text-right w-full sm:w-auto p-3 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-widest">
                Booking Reference ID
              </span>
              <span className="font-mono text-base font-extrabold text-[#E0A96D] block leading-tight">
                {currentBooking.bookingReference}
              </span>
              <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 border border-amber-500 text-amber-300">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>
                  {currentBooking.paymentStatus === 'verified'
                    ? 'Payment Confirmed'
                    : 'Pending Receipt Verification'}
                </span>
              </div>
            </div>
          </div>

          {/* Traveler Details & Pickup Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-white/10 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                Lead Traveler
              </span>
              <span className="font-bold text-white text-sm block mt-0.5">
                {currentBooking.leadTraveler.fullName}
              </span>
              <span className="text-slate-400 block text-[11px] truncate">
                {currentBooking.leadTraveler.email}
              </span>
              <span className="text-emerald-400 text-[11px] block">
                {currentBooking.leadTraveler.phone}
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                San Ignacio Pickup
              </span>
              <span className="font-bold text-white text-xs block mt-0.5 leading-snug">
                {currentBooking.pickupLocation}
              </span>
              <span className="text-slate-400 text-[10px] block mt-0.5">
                A/C 4x4 Tour Van Departure: 7:30 AM
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                Total Group Size
              </span>
              <span className="font-bold text-white text-sm block mt-0.5">
                {currentBooking.companions.length + 1} Explorers
              </span>
              <span className="text-slate-400 text-[11px] block">
                1 Lead + {currentBooking.companions.length} Companions
              </span>
            </div>
          </div>

          {/* Included Tours & Dates */}
          <div className="py-5 border-b border-white/10">
            <h3 className="text-xs uppercase font-bold text-[#E0A96D] tracking-wider mb-3">
              Confirmed Expeditions Schedule
            </h3>
            <div className="space-y-2.5">
              {currentBooking.tours.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#0F382C] text-[#E0A96D] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-white block text-xs sm:text-sm">
                        {t.tourTitle}
                      </span>
                      <span className="text-slate-400 text-[11px] flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-[#E0A96D]" />
                        <span>Scheduled: {t.selectedDate}</span>
                        <span>·</span>
                        <Users className="w-3 h-3 text-[#E0A96D]" />
                        <span>{t.guestsCount} Guests</span>
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-white text-xs sm:text-sm tabular-nums">
                    ${currency === 'BZD' ? t.priceUsd * t.guestsCount * 2 : t.priceUsd * t.guestsCount} {currency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Roster & Dietary Manifest */}
          <div className="py-4 border-b border-white/10 text-xs">
            <h3 className="text-xs uppercase font-bold text-[#E0A96D] tracking-wider mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              <span>Catering & Dietary Requirements Manifest</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                <span className="font-bold text-white block">{currentBooking.leadTraveler.fullName}</span>
                <span className="text-slate-400">Diet: Traditional Belizean Rice & Beans</span>
              </div>
              {currentBooking.companions.map(c => (
                <div key={c.id} className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="font-bold text-white block">{c.fullName} ({c.ageGroup})</span>
                  <span className="text-slate-400">
                    Diet: {c.dietaryRestrictions.join(', ') || 'No restrictions'} {c.notes ? `· ${c.notes}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Notice & Guarantee */}
          <div className="mt-5 p-3.5 rounded-2xl bg-[#0F382C]/50 border border-[#0F382C] flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-300">
              <strong className="text-white block font-semibold">Important Remote Wilderness Notice:</strong>
              Cellular reception is sparse inside Tapir Mountain Nature Reserve (ATM Cave), Mountain Pine Ridge, and the Chiquibul Jungle. <span className="text-[#E0A96D] font-bold">Save this voucher image to your phone's photo library</span> for immediate verification by your tour driver and BTB guides.
            </div>
          </div>

          {/* Total Breakdown Summary */}
          <div className="mt-4 pt-3 flex justify-between items-baseline text-xs text-slate-400">
            <span>Total Package Value (All Taxes & Permits Included):</span>
            <span className="font-display text-base font-extrabold text-white tabular-nums">
              ${currency === 'BZD' ? currentBooking.totalBzd : currentBooking.totalUsd} {currency} (≈ ${currentBooking.totalBzd} BZD)
            </span>
          </div>

        </div>

        {/* Action Button Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F382C] border border-emerald-500/40 text-emerald-300 text-[11px] font-medium">
              <HardDriveDownload className="w-3 h-3 text-[#E0A96D]" />
              <span>Offline Ready on Device</span>
            </span>
            {downloadSuccess && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Voucher PNG saved!</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={downloadVoucherImage}
              disabled={isGenerating}
              className="flex-1 sm:flex-none py-3 px-6 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] hover:from-[#134839] hover:to-[#1a5b48] border border-[#E0A96D]/50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating High-Res Image...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#E0A96D]" />
                  <span>Download Offline Booking Voucher (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { 
  X, 
  Building2, 
  Copy, 
  Check, 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  Calendar, 
  Users, 
  Utensils, 
  ArrowLeft,
  DownloadCloud,
  FileSignature
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { LiabilityWaiverModal } from './LiabilityWaiverModal';

export const AtlanticBankCheckout: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    currentBooking, 
    setCurrentBooking, 
    submitAtlanticBankReceipt,
    setIsVoucherOpen,
    currency
  } = useApp();
  const { notifyReceiptUpload } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCheckoutOpen || !currentBooking) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUploadReceipt = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      await submitAtlanticBankReceipt(currentBooking.bookingReference, selectedFile);
      setIsUploading(false);
      setUploadSuccess(true);
      notifyReceiptUpload(currentBooking.bookingReference);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const handleOpenVoucher = () => {
    setIsCheckoutOpen(false);
    setIsVoucherOpen(true);
  };

  const handleWaiverSigned = (waiverData: any) => {
    setCurrentBooking({
      ...currentBooking,
      liabilityWaiver: waiverData
    });
    setIsWaiverModalOpen(false);
    setStep(2);
  };

  const isWaiverSigned = Boolean(currentBooking.liabilityWaiver?.signedName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden shadow-2xl my-6 border border-white/20 animate-in fade-in zoom-in-95 duration-200 text-slate-200">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0A96D]" />
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                Atlantic Bank Direct Payment & Verification
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              San Ignacio Town Licensed Operator Official Bank Transfer Flow
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-black/20 text-center text-xs">
          <button
            onClick={() => setStep(1)}
            className={`py-3 px-2 font-semibold border-b-2 transition-colors ${
              step === 1 ? 'border-[#E0A96D] text-[#E0A96D] bg-[#0F382C]/30' : 'border-transparent text-slate-400'
            }`}
          >
            1. Review Itinerary
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-3 px-2 font-semibold border-b-2 transition-colors ${
              step === 2 ? 'border-[#E0A96D] text-[#E0A96D] bg-[#0F382C]/30' : 'border-transparent text-slate-400'
            }`}
          >
            2. Atlantic Bank Wire
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-3 px-2 font-semibold border-b-2 transition-colors ${
              step === 3 ? 'border-[#E0A96D] text-[#E0A96D] bg-[#0F382C]/30' : 'border-transparent text-slate-400'
            }`}
          >
            3. Upload Receipt
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          
          {/* STEP 1: Review Itinerary, Group Details & Dietary Notes */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#E0A96D] tracking-wider block">
                    Assigned Booking Reference
                  </span>
                  <span className="font-mono text-base font-bold text-white">
                    {currentBooking.bookingReference}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Grand Total
                  </span>
                  <span className="font-display text-xl font-bold text-white tabular-nums">
                    ${currency === 'BZD' ? currentBooking.totalBzd : currentBooking.totalUsd} {currency}
                  </span>
                </div>
              </div>

              {/* Lead Traveler & Pickup */}
              <div className="bg-black/30 rounded-2xl p-4 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Lead Traveler</span>
                  <span className="font-bold text-white">{currentBooking.leadTraveler.fullName}</span>
                  <span className="text-slate-400 block text-[11px]">{currentBooking.leadTraveler.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Pickup Location</span>
                  <span className="font-bold text-white">{currentBooking.pickupLocation}</span>
                </div>
              </div>

              {/* Included Expeditions */}
              <div>
                <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#E0A96D] mb-2">
                  Tours in Reservation ({currentBooking.tours.length})
                </h4>
                <div className="space-y-2">
                  {currentBooking.tours.map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">{t.tourTitle}</span>
                        <span className="text-slate-400 text-[11px]">
                          {t.selectedDate} · {t.guestsCount} Explorers · Inclusions Guaranteed
                        </span>
                      </div>
                      <span className="font-bold text-white tabular-nums">
                        ${currency === 'BZD' ? t.priceUsd * t.guestsCount * 2 : t.priceUsd * t.guestsCount} {currency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Companions & Dietary Requirements */}
              <div>
                <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#E0A96D] mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Group Roster & Dietary Requirements</span>
                </h4>
                <div className="bg-black/30 rounded-2xl p-3.5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <div>
                      <span className="font-bold text-white">{currentBooking.leadTraveler.fullName} (Lead)</span>
                      <span className="text-slate-400 block text-[10px]">
                        Traditional Belizean Rice & Beans · Fresh Fruit
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold">Confirmed</span>
                  </div>

                  {currentBooking.companions.map(c => (
                    <div key={c.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white">{c.fullName} ({c.ageGroup})</span>
                        <span className="text-slate-400 block text-[10px]">
                          Diet: {c.dietaryRestrictions.join(', ') || 'No restrictions'} {c.notes ? `(${c.notes})` : ''}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BTB Compliance & Digital Liability Waiver Status Card */}
              <div className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                isWaiverSigned 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                  : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isWaiverSigned 
                      ? 'bg-emerald-900 border border-emerald-400/40 text-emerald-300' 
                      : 'bg-amber-900 border border-amber-400/40 text-amber-300'
                  }`}>
                    {isWaiverSigned ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <ShieldCheck className="w-5 h-5 text-[#E0A96D]" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">
                      {isWaiverSigned ? 'BTB Digital Liability Waiver Signed' : 'Mandatory BTB Liability & Safety Waiver'}
                    </h5>
                    <p className="text-[11px] text-slate-300">
                      {isWaiverSigned 
                        ? `Digitally signed by ${currentBooking.liabilityWaiver?.signedName} (Verified)`
                        : 'Belize Tourism Board regulatory compliance required before bank wire.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsWaiverModalOpen(true)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isWaiverSigned
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-[#E0A96D] hover:bg-[#c99558] text-slate-950 shadow-md animate-pulse'
                  }`}
                >
                  <FileSignature className="w-3.5 h-3.5" />
                  <span>{isWaiverSigned ? 'View Waiver' : 'Sign Waiver'}</span>
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    if (!isWaiverSigned) {
                      setIsWaiverModalOpen(true);
                    } else {
                      setStep(2);
                    }
                  }}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <span>{isWaiverSigned ? 'Continue to Bank Transfer Details' : 'Sign BTB Waiver to Continue'}</span>
                  <ChevronRight className="w-4 h-4 text-[#E0A96D]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Atlantic Bank Direct Wire / Transfer Instructions */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-[#0F382C]/40 border border-[#0F382C] flex items-start gap-3">
                <Building2 className="w-6 h-6 text-[#E0A96D] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-white text-sm">
                    Atlantic Bank Ltd. (Belize) Wire Instructions
                  </h4>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    Please execute a local online banking transfer, teller deposit, or international wire using the exact credentials below. Be sure to paste the Reference ID in the memo note.
                  </p>
                </div>
              </div>

              {/* Bank Details Card with Copy Buttons */}
              <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-3.5 text-xs">
                
                {/* Bank Name */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Bank Name</span>
                    <span className="font-semibold text-white">Atlantic Bank Ltd.</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('Atlantic Bank Ltd.', 'bankName')}
                    className="p-1.5 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedField === 'bankName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'bankName' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Beneficiary</span>
                    <span className="font-semibold text-white">Cayo Eco-Tours Belize Ltd.</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('Cayo Eco-Tours Belize Ltd.', 'acctName')}
                    className="p-1.5 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedField === 'acctName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'acctName' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Number</span>
                    <span className="font-mono text-sm font-bold text-[#E0A96D]">2110009876</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('2110009876', 'acctNum')}
                    className="p-1.5 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedField === 'acctNum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'acctNum' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Branch */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Bank Branch</span>
                    <span className="font-semibold text-white">San Ignacio Branch, Cayo</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('San Ignacio Branch, Cayo', 'branch')}
                    className="p-1.5 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedField === 'branch' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'branch' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Required Reference Note */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0F382C]/60 border border-[#E0A96D]/50 shadow-md">
                  <div>
                    <span className="text-[#E0A96D] text-[10px] uppercase font-bold block">
                      Mandatory Wire Memo / Reference Note
                    </span>
                    <span className="font-mono text-sm font-extrabold text-white">
                      {currentBooking.bookingReference}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentBooking.bookingReference, 'refNote')}
                    className="py-1 px-2.5 rounded-lg bg-[#E0A96D] text-slate-950 font-bold flex items-center gap-1 text-[11px] shadow-sm hover:scale-105 transition-transform"
                  >
                    {copiedField === 'refNote' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'refNote' ? 'Copied' : 'Copy Ref'}</span>
                  </button>
                </div>

              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Itinerary</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <span>I’ve Completed Wire · Upload Receipt</span>
                  <ChevronRight className="w-4 h-4 text-[#E0A96D]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Interactive Receipt File Uploader */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {uploadSuccess ? (
                <div className="p-6 text-center rounded-2xl bg-[#0F382C]/40 border border-emerald-500/40 space-y-4 animate-in zoom-in-95">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Receipt Uploaded & Under Review!
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                      Your transfer screenshot was submitted to the Cayo Eco-Tours San Ignacio desk. Status set to <span className="text-[#E0A96D] font-bold">under_review</span>. Your offline booking voucher is now ready!
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleOpenVoucher}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto hover:scale-105 transition-transform shadow-lg"
                    >
                      <DownloadCloud className="w-4 h-4 text-[#E0A96D]" />
                      <span>View & Download Offline Booking Voucher</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-1">
                      Upload Bank Deposit Slip / Transfer Screenshot
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Capture a photo of your Atlantic Bank deposit slip or mobile app transfer confirmation showing reference <strong className="text-white">{currentBooking.bookingReference}</strong>.
                    </p>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                      isDragging 
                        ? 'border-[#E0A96D] bg-[#0F382C]/50' 
                        : 'border-white/20 bg-black/30 hover:border-[#E0A96D]/50 hover:bg-black/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {filePreview ? (
                      <div className="space-y-3">
                        <img
                          src={filePreview}
                          alt="Receipt Preview"
                          className="max-h-40 rounded-xl mx-auto object-contain border border-white/20 shadow-md"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-emerald-400 block">{selectedFile?.name}</span>
                          <span className="text-[10px] text-slate-400">Click or drag another to replace</span>
                        </div>
                      </div>
                    ) : selectedFile ? (
                      <div className="space-y-2">
                        <FileText className="w-12 h-12 text-[#E0A96D] mx-auto" />
                        <span className="font-bold text-white text-xs block">{selectedFile.name}</span>
                        <span className="text-[10px] text-slate-400">PDF Document Selected</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center mx-auto text-[#E0A96D]">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm text-white block">
                          Drop bank transfer receipt here, or <span className="text-[#E0A96D] underline">browse files</span>
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          Supports JPG, PNG, WEBP, or PDF (Max 15MB)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submission Action */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Wire Details</span>
                    </button>

                    <button
                      onClick={handleUploadReceipt}
                      disabled={!selectedFile || isUploading}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs flex items-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-transform shadow-lg"
                    >
                      {isUploading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying & Uploading to Storage...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#E0A96D]" />
                          <span>Submit Receipt for Verification</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

      </div>

      {/* BTB Liability Waiver Modal */}
      <LiabilityWaiverModal
        isOpen={isWaiverModalOpen}
        onClose={() => setIsWaiverModalOpen(false)}
        onAcceptAndSign={handleWaiverSigned}
      />
    </div>
  );
};

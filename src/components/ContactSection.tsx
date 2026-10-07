import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { siteContent } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hotel, setHotel] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center sm:text-left">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E0A96D] font-bold mb-2">
          <span>Headquarters & Inquiries</span>
          <span aria-hidden="true">·</span>
          <span>Burns Avenue, San Ignacio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Connect with Our Local Guides
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Info & Map Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {siteContent.businessName} Headquarters
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
              Based right in the vibrant heart of San Ignacio Town. We manage daily hotel shuttles across all Cayo resorts, including Chaa Creek, Ka’ana, Mystic River, and downtown guesthouses.
            </p>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Town Center Operations:</span>
                  <span>{siteContent.officeLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Direct Desk Telephone:</span>
                  <span>{siteContent.phone} (Belize Local Landline)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">WhatsApp Expedition Hotline (24/7):</span>
                  <span>{siteContent.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Official Inquiries:</span>
                  <span>{siteContent.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E0A96D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Office Hours:</span>
                  <span>{siteContent.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F382C]/50 border border-[#0F382C] flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#E0A96D] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Official Belize Tourism Board (BTB) License</span>
              <span className="text-slate-300">License ID: {siteContent.btbLicense} · Insured & Certified</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Send an Inquiry or Custom Request
          </h3>
          <p className="text-xs text-slate-300 mb-6 font-normal">
            Need private transfers, airport shuttles from BZE, or custom multi-day adventure packages?
          </p>

          {sent ? (
            <div className="p-8 text-center bg-[#0F382C]/30 rounded-2xl border border-emerald-500/30 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-display text-lg font-bold text-white mb-1">Message Received!</h4>
              <p className="text-xs text-slate-300 mb-5">
                Thank you, {name}. Our San Ignacio expedition coordinator will review your request and reply within 2 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <button
                  type="button"
                  onClick={() => {
                    const waText = encodeURIComponent(
                      `Hello Cayo Eco-Tours! My name is ${name} (${email}). Staying at ${hotel || 'San Ignacio'}.\nInquiry: ${message}`
                    );
                    window.open(`https://wa.me/5016108687?text=${waText}`, '_blank');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open Now on WhatsApp Desk</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setEmail('');
                    setHotel('');
                    setMessage('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                  Staying Hotel / Lodge in Cayo
                </label>
                <input
                  type="text"
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  placeholder="e.g. San Ignacio Resort Hotel or Ka’ana"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                  Adventure Questions / Custom Itinerary Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your dates, group size, or questions about ATM Cave footwear, cave tubing, or transfers..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs hover:scale-[1.01] transition-transform shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#E0A96D]" />
                <span>Submit Expedition Inquiry</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};

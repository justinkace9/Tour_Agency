import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  UserCheck, 
  DollarSign, 
  Clock, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  Compass, 
  BookOpen, 
  Users, 
  LayoutDashboard, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Plus,
  Megaphone,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TourManager } from './admin/TourManager';
import { SiteContentEditor } from './admin/SiteContentEditor';
import { AdminBookingsCenter } from './admin/AdminBookingsCenter';
import { AdminChatConsole } from './admin/AdminChatConsole';
import { BlogEditor } from './admin/BlogEditor';
import { CustomerProfiles } from './admin/CustomerProfiles';
import { PaymentVerificationModal } from './admin/PaymentVerificationModal';
import { BookingDetails } from '../types/tour';

type AdminTab = 'overview' | 'tours' | 'content' | 'bookings' | 'chat' | 'customers' | 'blog';

export const AdminPortal: React.FC = () => {
  const { 
    adminAuthenticated, 
    setAdminAuthenticated, 
    setActiveView, 
    tours, 
    allBookings, 
    chatThreads, 
    customers, 
    blogPosts,
    siteContent
  } = useApp();

  // Credentials State
  // Specified Credentials:
  // Username: ToursAdmin1
  // Password: Rodge.007
  // Security Code: 7619
  const [username, setUsername] = useState('ToursAdmin1');
  const [password, setPassword] = useState('Rodge.007');
  const [securityCode, setSecurityCode] = useState('7619');
  const [showPassword, setShowPassword] = useState(false);
  const [challengeError, setChallengeError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Active Tab: 6 core tabs as requested
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  // Quick inspect from overview
  const [inspectBooking, setInspectBooking] = useState<BookingDetails | null>(null);

  // Quick Gallery / Upload modal
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Challenge Handler
  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeError('');

    const u = username.trim();
    const p = password;
    const c = securityCode.trim();

    // Authenticate with ToursAdmin1 or backwards-compatible One_Admin
    const isValidPrimary = (u === 'ToursAdmin1' && p === 'Rodge.007' && c === '7619');
    const isValidSecondary = (u === 'One_Admin' && p === 'Admin.007-Tour' && c === '7619');

    if (isValidPrimary || isValidSecondary) {
      setAdminAuthenticated(true);
      setAttempts(0);
    } else {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setChallengeError(
        `Security verification failed (Attempt ${nextAttempt}/5). Please check credentials: ToursAdmin1 / Rodge.007 / 7619.`
      );
    }
  };

  const handleDevBypass = () => {
    setAdminAuthenticated(true);
    setAttempts(0);
  };

  // KPI Calculations
  const pendingReceipts = allBookings.filter(b => b.paymentStatus === 'under_review');
  const verifiedBookings = allBookings.filter(b => b.paymentStatus === 'verified');
  const totalRevenueBzd = allBookings
    .filter(b => b.paymentStatus === 'verified' || b.paymentStatus === 'under_review')
    .reduce((acc, b) => acc + b.totalBzd, 0);

  const unreadMessagesCount = chatThreads.reduce((acc, t) => acc + t.unreadCount, 0);

  // If not authenticated, render Security Gate
  if (!adminAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center bg-[#090C10]">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-emerald-900/50 shadow-2xl relative">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0F382C] border border-[#E0A96D]/50 text-[#E0A96D] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-950/60">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              Admin Portal & CRM Gate
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              San Ignacio, Cayo Operator Back-Office Management
            </p>
          </div>

          {/* Dev Bypass Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-[#0F382C]/40 border border-[#E0A96D]/40 text-xs flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-[#E0A96D] block">Developer Access Gateway</span>
              <span className="text-[11px] text-slate-300">Quick-Switch test bypass available</span>
            </div>
            <button
              type="button"
              onClick={handleDevBypass}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>Bypass Login</span>
            </button>
          </div>

          {challengeError && (
            <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs mb-5 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{challengeError}</span>
            </div>
          )}

          <form onSubmit={handleChallengeSubmit} className="space-y-4">
            
            {/* Username */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Username</span>
                <span className="text-[10px] text-[#E0A96D] font-mono">ToursAdmin1</span>
              </label>
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 focus-within:border-[#E0A96D] rounded-xl px-3.5 py-2.5 text-white">
                <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ToursAdmin1"
                  className="w-full bg-transparent text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-[#E0A96D] font-mono">Rodge.007</span>
              </label>
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 focus-within:border-[#E0A96D] rounded-xl px-3.5 py-2.5 text-white">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Rodge.007"
                  className="w-full bg-transparent text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Code */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Security Code</span>
                <span className="text-[10px] text-[#E0A96D] font-mono">7619</span>
              </label>
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 focus-within:border-[#E0A96D] rounded-xl px-3.5 py-2.5 text-white">
                <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder="7619"
                  className="w-full bg-transparent text-xs tracking-widest font-mono focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border border-emerald-500/50 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              Verify Credentials & Unlock Portal
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ← Return to Public Homepage
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard & Back-Office CRM
  return (
    <div className="min-h-screen bg-[#090C10] text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0D1117] border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#0F382C] border border-[#E0A96D]/40 text-[#E0A96D] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">
                Cayo Operator CRM
              </span>
              <span className="text-[10px] text-[#E0A96D] font-mono block">
                San Ignacio Town HQ
              </span>
            </div>
          </div>

          {/* Navigation Items - 6 Core Modules as Specified */}
          <nav className="space-y-1.5 text-xs font-semibold">
            
            {/* 1. Overview & Metrics */}
            <button
              onClick={() => setCurrentTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'overview'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>1. Overview & Metrics</span>
            </button>

            {/* 2. Tour Listings Manager (CMS) */}
            <button
              onClick={() => setCurrentTab('tours')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'tours'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4" />
                <span>2. Tour Listings (CMS)</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-400">
                {tours.length}
              </span>
            </button>

            {/* 3. Site Content & Contact Info Editor */}
            <button
              onClick={() => setCurrentTab('content')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'content'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>3. Site Content & Contact</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {/* 4. Bookings & Payment Verification (Atlantic Bank Receipts) */}
            <button
              onClick={() => setCurrentTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'bookings'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4" />
                <span>4. Bookings & Bank Wire</span>
              </div>
              {pendingReceipts.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                  {pendingReceipts.length} review
                </span>
              )}
            </button>

            {/* 5. Live Customer Messages & Agent Inbox */}
            <button
              onClick={() => setCurrentTab('chat')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'chat'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>5. Agent Chat Inbox</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E0A96D] text-slate-950">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* 6. Customer Directory */}
            <button
              onClick={() => setCurrentTab('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'customers'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>6. Customer Directory</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-400">
                {customers.length}
              </span>
            </button>

            {/* Optional 7. Destination Guide CMS */}
            <button
              onClick={() => setCurrentTab('blog')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'blog'
                  ? 'bg-[#0F382C] text-[#E0A96D] border border-[#E0A96D]/40 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>7. Destination Blog CMS</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-400">
                {blogPosts.length}
              </span>
            </button>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => setActiveView('home')}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white text-left flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span>Public Traveler View</span>
          </button>

          <button
            onClick={() => {
              setAdminAuthenticated(false);
              setActiveView('home');
            }}
            className="w-full py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-300 text-xs font-semibold text-left flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Operator Portal</span>
          </button>
        </div>

      </aside>

      {/* Main Back-Office Content Area */}
      <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
        
        {/* Top Operational Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase font-bold text-[#E0A96D] tracking-widest">
                Belize Tourism Board Licensed Operator #{siteContent.btbLicense}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {currentTab === 'overview' && 'Operations Command & Key Metrics'}
              {currentTab === 'tours' && 'Tour Listings Content Manager (CMS)'}
              {currentTab === 'content' && 'Site Content & Contact Info Editor'}
              {currentTab === 'bookings' && 'Atlantic Bank Verification & Bookings'}
              {currentTab === 'chat' && 'Live Customer Messages & Agent Inbox'}
              {currentTab === 'customers' && 'Customer Directory & VIP Profiles'}
              {currentTab === 'blog' && 'Cayo Destination Guide Blog CMS'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-mono bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Session: ToursAdmin1</span>
            </span>
          </div>
        </div>

        {/* Tab 1: Overview & Metrics Dashboard */}
        {currentTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Quick Actions Bar */}
            <div className="p-4 rounded-2xl bg-[#0F382C]/30 border border-[#E0A96D]/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs text-[#E0A96D] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Quick Actions Bar:</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentTab('tours')}
                  className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span>Add New Tour</span>
                </button>

                <button
                  onClick={() => setCurrentTab('content')}
                  className="py-2 px-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  <Megaphone className="w-3.5 h-3.5 text-amber-200" />
                  <span>Broadcast Notice</span>
                </button>

                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 border border-white/10 active:scale-95 transition-transform"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Upload Gallery Image</span>
                </button>
              </div>
            </div>

            {/* 4 Primary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Revenue in BZD */}
              <div className="glass-panel rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span className="uppercase font-bold tracking-wider text-[10px]">Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#E0A96D]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  ${totalRevenueBzd.toFixed(2)} BZD
                </div>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">
                  ≈ ${(totalRevenueBzd / 2).toFixed(2)} USD (Fixed 2:1 peg)
                </span>
              </div>

              {/* Pending Atlantic Bank Receipts */}
              <div 
                onClick={() => setCurrentTab('bookings')}
                className="glass-panel rounded-2xl p-5 border border-amber-900/40 hover:border-amber-500/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span className="uppercase font-bold tracking-wider text-[10px]">Pending Bank Receipts</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                  {pendingReceipts.length} Pending
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Click to inspect Atlantic Bank slips →
                </span>
              </div>

              {/* Active Bookings */}
              <div className="glass-panel rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span className="uppercase font-bold tracking-wider text-[10px]">Active Bookings</span>
                  <Calendar className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {allBookings.length} Total
                </div>
                <span className="text-[10px] text-emerald-400 font-medium block mt-1">
                  {verifiedBookings.length} Approved & Verified
                </span>
              </div>

              {/* Unread Inquiries / Chat Messages */}
              <div 
                onClick={() => setCurrentTab('chat')}
                className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span className="uppercase font-bold tracking-wider text-[10px]">Customer Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-[#E0A96D]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {unreadMessagesCount} Unread
                </div>
                <span className="text-[10px] text-[#E0A96D] block mt-1">
                  {chatThreads.length} active conversation threads →
                </span>
              </div>

            </div>

            {/* Quick Atlantic Bank Verification Queue */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#E0A96D]" />
                  <h3 className="font-display font-bold text-base text-white">
                    Atlantic Bank Transfer Verification Queue
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentTab('bookings')}
                  className="text-xs text-[#E0A96D] hover:underline font-bold"
                >
                  View All ({allBookings.length}) →
                </button>
              </div>

              {pendingReceipts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <span>All Atlantic Bank transfer receipts are up-to-date! No pending reviews.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingReceipts.map(b => (
                    <div
                      key={b.bookingReference}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          BET
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{b.leadTraveler.fullName}</span>
                            <span className="font-mono text-[10px] text-[#E0A96D]">{b.bookingReference}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">
                            {b.tours.map(t => t.tourTitle).join(' + ')} · {b.companions.length + 1} Guests
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="font-bold text-white font-mono text-sm block">${b.totalBzd} BZD</span>
                          <span className="text-[10px] text-amber-400 font-semibold">Slip Attached</span>
                        </div>

                        <button
                          onClick={() => setInspectBooking(b)}
                          className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Inspect Receipt</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links to Management Tools */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setCurrentTab('tours')}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Compass className="w-5 h-5 text-[#E0A96D]" />
                  <span className="text-xs text-[#E0A96D] group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Tour Inventory CMS</h4>
                <p className="text-xs text-slate-400">
                  Manage ATM Cave, Xunantunich, and Barton Creek pricing, inclusions, and difficulty tiers.
                </p>
              </div>

              <div 
                onClick={() => setCurrentTab('content')}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Site Content & Contact Editor</h4>
                <p className="text-xs text-slate-400">
                  Update San Ignacio office address, WhatsApp hotlines, live banner alerts, and Miss Gissell's bio.
                </p>
              </div>

              <div 
                onClick={() => setCurrentTab('chat')}
                className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#E0A96D]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">Support Agent Console</h4>
                <p className="text-xs text-slate-400">
                  Send live responses, pre-formatted pickup times, and tour link cards to client chats.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Tour Listings CMS */}
        {currentTab === 'tours' && <TourManager />}

        {/* Tab 3: Site Content & Contact Info Editor */}
        {currentTab === 'content' && <SiteContentEditor />}

        {/* Tab 4: Bookings & Atlantic Bank Verification */}
        {currentTab === 'bookings' && <AdminBookingsCenter />}

        {/* Tab 5: Live Support Agent Console */}
        {currentTab === 'chat' && <AdminChatConsole />}

        {/* Tab 6: Customer Directory CRM */}
        {currentTab === 'customers' && <CustomerProfiles />}

        {/* Optional Tab 7: Destination Guide Blog Editor */}
        {currentTab === 'blog' && <BlogEditor />}

      </main>

      {/* Inspect Receipt Modal when triggered from Overview */}
      {inspectBooking && (
        <PaymentVerificationModal
          booking={inspectBooking}
          onClose={() => setInspectBooking(null)}
        />
      )}

      {/* Quick Gallery / Image Upload Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0D1117] border border-white/20 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#E0A96D]" />
                <h3 className="font-display font-bold text-base text-white">Operator Gallery & Asset Manager</h3>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select or copy asset URLs to use in Tour Listings or Miss Gissell's Guide Bio.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
              {[
                { title: 'ATM Cave Cavern', url: '/src/assets/images/tour_atm_cave_1790779714359.jpg' },
                { title: 'Xunantunich Temple', url: '/src/assets/images/tour_xunantunich_1790779725322.jpg' },
                { title: 'Big Rock Falls', url: '/src/assets/images/tour_caracol_waterfall_1790779735253.jpg' },
                { title: 'Barton Creek Canoe', url: '/src/assets/images/tour_barton_creek_1790779744942.jpg' },
                { title: 'Rainforest Canopy', url: '/src/assets/images/hero_cayo_rainforest_1790779702967.jpg' },
                { title: 'Guide Miss Gissell', url: '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg' },
              ].map((item, i) => (
                <div key={i} className="p-2 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 group">
                  <img src={item.url} alt={item.title} className="w-full h-24 object-cover rounded-xl" />
                  <span className="text-[11px] font-bold text-white block truncate">{item.title}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      setCopiedUrl(item.url);
                      setTimeout(() => setCopiedUrl(null), 2000);
                    }}
                    className="w-full py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] flex items-center justify-center gap-1"
                  >
                    {copiedUrl === item.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUrl === item.url ? 'Copied URL!' : 'Copy Asset URL'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

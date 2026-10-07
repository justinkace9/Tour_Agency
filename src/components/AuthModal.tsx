import React, { useState } from 'react';
import { X, Mail, Lock, User, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    loginWithGoogle, 
    loginWithEmail, 
    signupWithEmail, 
    logout,
    favorites,
    itinerary
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      if (mode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await loginWithGoogle();
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          // Logged-in profile view
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#E0A96D] overflow-hidden bg-[#0F382C] flex items-center justify-center shadow-lg">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-10 h-10 text-[#E0A96D]" />
              )}
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-1">
              {currentUser.displayName || 'Eco Explorer'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {currentUser.email || 'Belize Guest Explorer'}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-left">
              <div className="bg-black/40 rounded-xl p-3 border border-white/10">
                <span className="text-[10px] uppercase font-semibold text-[#E0A96D] block">
                  Saved Favorites
                </span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {favorites.length} tours
                </span>
              </div>
              <div className="bg-black/40 rounded-xl p-3 border border-white/10">
                <span className="text-[10px] uppercase font-semibold text-[#E0A96D] block">
                  Drafted Itinerary
                </span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {itinerary.length} booked
                </span>
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
                setIsAuthModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl border border-rose-900/50 text-rose-400 hover:bg-rose-950/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        ) : (
          // Sign In / Sign Up View
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0F382C] border border-[#E0A96D]/40 flex items-center justify-center mx-auto mb-3 text-[#E0A96D]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {mode === 'signin' ? 'Welcome Back' : 'Create Explorer Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Sync your Cayo favorites and customized itineraries across devices
              </p>
            </div>

            {/* Google Quick Sign-in Button */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center justify-center gap-3 transition-colors mb-4 shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-[#0D1117] px-3 text-[11px] text-slate-500 uppercase">
                Or with email
              </span>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs mb-3">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="explorer@belize.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-slate-400 mb-1">
                  Password
                </label>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs hover:scale-[1.01] transition-transform shadow-md mt-2"
              >
                {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-4 text-xs text-slate-400">
              {mode === 'signin' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-[#E0A96D] hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="text-[#E0A96D] hover:underline font-semibold"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

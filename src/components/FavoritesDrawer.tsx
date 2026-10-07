import React from 'react';
import { X, Heart, ArrowRight, Trash2, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FavoritesDrawer: React.FC = () => {
  const { 
    isFavoritesOpen, 
    setIsFavoritesOpen, 
    favorites, 
    toggleFavorite, 
    tours, 
    setSelectedTour,
    addToItinerary
  } = useApp();

  if (!isFavoritesOpen) return null;

  const favoritedTours = tours.filter(tour => favorites.includes(tour.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0D1117] h-full border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#E0A96D] fill-[#E0A96D]" />
              <h3 className="font-display text-lg font-bold text-white">
                Saved Expeditions ({favorites.length})
              </h3>
            </div>
            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          {favoritedTours.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Heart className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-slate-600" />
              <p className="text-sm">You haven’t saved any tours yet.</p>
              <p className="text-xs text-slate-500 mt-1">
                Tap the heart on any tour card to save it for later.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-none no-scrollbar">
              {favoritedTours.map(tour => (
                <div
                  key={tour.id}
                  className="glass-card rounded-2xl p-3 border border-white/10 flex gap-3 items-center group"
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#E0A96D] font-bold uppercase tracking-wider block">
                      {tour.badge}
                    </span>
                    <h4 className="font-display text-xs font-bold text-white truncate group-hover:text-[#E0A96D]">
                      {tour.title}
                    </h4>
                    <span className="text-xs font-bold text-white mt-1 block">
                      ${tour.priceUsd} <span className="text-[10px] text-slate-400">USD/pers</span>
                    </span>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          setSelectedTour(tour);
                          setIsFavoritesOpen(false);
                        }}
                        className="text-[11px] text-[#E0A96D] hover:underline font-semibold"
                      >
                        View Details
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 2);
                          addToItinerary(tour, tomorrow.toISOString().split('T')[0], 2, 'San Ignacio');
                          setIsFavoritesOpen(false);
                        }}
                        className="text-[11px] text-emerald-400 hover:underline font-semibold"
                      >
                        Add to Itinerary
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(tour.id)}
                    aria-label="Remove from favorites"
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoritedTours.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                favoritedTours.forEach(tour => {
                  addToItinerary(tour, new Date().toISOString().split('T')[0], 2, 'San Ignacio');
                });
                setIsFavoritesOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#164E3E] to-[#0F382C] border border-[#E0A96D]/50 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Add All to Custom Itinerary</span>
              <ArrowRight className="w-4 h-4 text-[#E0A96D]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

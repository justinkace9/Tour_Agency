import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder = 'Select option',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-[11px] uppercase tracking-wider text-[#E0A96D] font-semibold mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl bg-black/40 hover:bg-black/60 border transition-all text-left ${
          isOpen
            ? 'border-[#E0A96D] ring-2 ring-[#E0A96D]/20 bg-black/70'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          <div className="truncate">
            <span className="text-sm font-medium text-white block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#E0A96D] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Animated Dropdown Menu with Neat Rounded Corners */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-2 w-full min-w-[200px] max-h-64 overflow-y-auto rounded-2xl bg-[#0D1117]/95 backdrop-blur-xl border border-white/20 shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#0F382C] text-[#E0A96D] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <div className="truncate">
                    <span className="block truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[10px] text-slate-400 block truncate font-normal">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

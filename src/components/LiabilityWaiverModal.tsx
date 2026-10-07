/**
 * BTB (Belize Tourism Board) Digital Liability Waiver & Eco-Adventure Advisory Modal
 * Regulatory Compliance for Cayo District In-Land Expeditions (ATM Cave, Xunantunich, Caracol, Barton Creek)
 */
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  CheckSquare, 
  Square, 
  CameraOff, 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  X,
  Phone,
  PenLine
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomDropdown, DropdownOption } from './common/CustomDropdown';

const RELATION_OPTIONS: DropdownOption[] = [
  { value: 'Spouse / Partner', label: 'Spouse / Partner' },
  { value: 'Parent / Guardian', label: 'Parent / Guardian' },
  { value: 'Sibling / Family', label: 'Sibling / Family' },
  { value: 'Friend', label: 'Friend' },
  { value: 'Hotel Front Desk', label: 'Hotel Front Desk' }
];

interface LiabilityWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndSign: (waiverData: {
    signedName: string;
    agreedAt: string;
    atmAdvisoryAcknowledged: boolean;
    medicalConditions: {
      hasCondition: boolean;
      details?: string;
      asthma: boolean;
      heartCondition: boolean;
      pregnancy: boolean;
    };
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  }) => void;
}

export const LiabilityWaiverModal: React.FC<LiabilityWaiverModalProps> = ({
  isOpen,
  onClose,
  onAcceptAndSign
}) => {
  const { currentBooking, currentUser } = useApp();

  const [signatureName, setSignatureName] = useState(
    currentBooking?.leadTraveler.fullName || currentUser?.displayName || ''
  );
  const [atmAcknowledged, setAtmAcknowledged] = useState(false);
  const [generalRisksAcknowledged, setGeneralRisksAcknowledged] = useState(false);
  const [btbComplianceAgreed, setBtbComplianceAgreed] = useState(false);
  
  // Medical Disclosures
  const [hasMedical, setHasMedical] = useState(false);
  const [asthma, setAsthma] = useState(false);
  const [heartCondition, setHeartCondition] = useState(false);
  const [pregnancy, setPregnancy] = useState(false);
  const [medicalDetails, setMedicalDetails] = useState('');

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Spouse / Family');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Check if booking has ATM Cave tour
  const hasAtmTour = currentBooking?.tours.some(t => 
    t.tourId.toLowerCase().includes('atm') || 
    t.tourTitle.toLowerCase().includes('atm') || 
    t.tourTitle.toLowerCase().includes('muknal')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!signatureName.trim()) {
      setErrorMsg('Please enter your full legal name as your digital signature.');
      return;
    }
    if (!generalRisksAcknowledged) {
      setErrorMsg('You must review and accept the General Eco-Adventure Risk Assumption.');
      return;
    }
    if (hasAtmTour && !atmAcknowledged) {
      setErrorMsg('You must review and acknowledge the Mandatory ATM Cave Preservation & Safety Advisory.');
      return;
    }
    if (!btbComplianceAgreed) {
      setErrorMsg('You must agree to Belize Tourism Board (BTB) registered guide instructions.');
      return;
    }
    if (!emergencyName.trim() || !emergencyPhone.trim()) {
      setErrorMsg('Please provide a valid emergency contact name and phone number.');
      return;
    }

    onAcceptAndSign({
      signedName: signatureName.trim(),
      agreedAt: new Date().toISOString(),
      atmAdvisoryAcknowledged: atmAcknowledged,
      medicalConditions: {
        hasCondition: hasMedical || asthma || heartCondition || pregnancy,
        details: medicalDetails.trim(),
        asthma,
        heartCondition,
        pregnancy
      },
      emergencyContact: {
        name: emergencyName.trim(),
        phone: emergencyPhone.trim(),
        relationship: emergencyRelation
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1117] border border-[#E0A96D]/40 rounded-3xl shadow-2xl overflow-hidden my-6 text-slate-200 ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0F382C] via-[#144738] to-[#0D1117] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/40 border border-[#E0A96D]/50 flex items-center justify-center text-[#E0A96D] shrink-0 shadow-inner">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  BTB Regulatory Compliance & Digital Waiver
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0A96D] text-slate-950 font-bold uppercase tracking-wider">
                  Mandatory
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Belize Tourism Board Licensed Operator Regulations · San Ignacio, Cayo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Reservation Summary */}
          {currentBooking && (
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Booking Reference</span>
                <span className="font-mono font-bold text-[#E0A96D]">{currentBooking.bookingReference}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Party Size</span>
                <span className="font-bold text-white">
                  {1 + currentBooking.companions.length} Explorer{currentBooking.companions.length > 0 ? 's' : ''}
                </span>
              </div>
            </div>
          )}

          {/* ATM CAVE SPECIAL ADVISORY (HIGHLIGHTED COMPLIANCE) */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <CameraOff className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Actun Tunichil Muknal (ATM) Cave Preservation & Special Safety Advisory</span>
            </div>

            <p className="text-slate-200 leading-relaxed text-[11px]">
              By decree of the <strong>National Institute of Culture and History (NICH)</strong> and the <strong>Belize Department of Archaeology</strong>:
            </p>

            <ul className="space-y-1.5 text-[11px] text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Strict Camera Prohibition:</strong> Under NO circumstances are cameras, GoPros, cell phones, or recording devices permitted inside the ATM Cave reserve. This preserves ancient Maya skeletal relics from accidental impact.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Mandatory Sock Regulation:</strong> Explorers must wear clean, dry socks in the sacred dry upper chambers to protect calcite crystallization and the <em>Crystal Maiden</em> skeleton.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Physical Exertion & Water Skills:</strong> Tour involves swimming across a 15-foot deep spring pool, continuous wading against subterranean currents, and maneuvering through tight limestone crevices.</span>
              </li>
            </ul>

            <label className="flex items-start gap-3 pt-2 border-t border-amber-500/20 cursor-pointer">
              <input
                type="checkbox"
                checked={atmAcknowledged}
                onChange={(e) => setAtmAcknowledged(e.target.checked)}
                className="mt-0.5 rounded border-amber-400 text-amber-500 focus:ring-0 w-4 h-4"
              />
              <span className="text-xs font-semibold text-amber-200">
                I and all members of my group explicitly acknowledge the strict No-Camera policy, sock requirement, and high physical rating of the ATM Cave expedition.
              </span>
            </label>
          </div>

          {/* GENERAL ECO-ADVENTURE RISK ASSUMPTION */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#E0A96D]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Assumption of Risk & Release of Liability</span>
            </h4>
            <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 h-28 overflow-y-auto space-y-2 leading-relaxed font-sans">
              <p>
                I acknowledge that eco-adventure excursions in the Cayo District of Belize—including but not limited to cave exploration (spelunking), subterranean river tubing, hiking on steep rainforest trails, canoeing, and swimming in natural waterfalls (Mountain Pine Ridge, Big Rock Falls)—involve inherent risks of property damage, illness, physical injury, or accidental trauma.
              </p>
              <p>
                I certify that I and all registered companions are in adequate physical condition to engage in these outdoor expeditions and assume all ordinary and extraordinary risks inherent to tropical wilderness travel.
              </p>
              <p>
                I agree to adhere strictly to all instructions given by licensed tour guides registered with the Belize Tourism Board (BTB), and follow all reserve park rules established by the Forestry Department and the Belize Institute of Archaeology.
              </p>
            </div>

            <label className="flex items-start gap-3 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generalRisksAcknowledged}
                onChange={(e) => setGeneralRisksAcknowledged(e.target.checked)}
                className="mt-0.5 rounded border-emerald-500 text-emerald-600 focus:ring-0 w-4 h-4"
              />
              <span className="text-xs font-medium text-slate-200">
                I have read and voluntarily agree to the Assumption of Risk and Release of Liability for myself and registered group members.
              </span>
            </label>

            <label className="flex items-start gap-3 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={btbComplianceAgreed}
                onChange={(e) => setBtbComplianceAgreed(e.target.checked)}
                className="mt-0.5 rounded border-emerald-500 text-emerald-600 focus:ring-0 w-4 h-4"
              />
              <span className="text-xs font-medium text-slate-200">
                I agree to comply with all official Belize Tourism Board (BTB) certified guide directives throughout our journey.
              </span>
            </label>
          </div>

          {/* MEDICAL DISCLOSURE */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-white text-xs">Confidential Medical Disclosures</span>
              </div>
              <span className="text-[10px] text-slate-400">Optional / Guided Safety</span>
            </div>

            <p className="text-[11px] text-slate-300">
              Does anyone in your traveling party experience conditions our guides should be prepared for? (Check all that apply):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={asthma}
                  onChange={(e) => setAsthma(e.target.checked)}
                  className="rounded border-white/20 text-[#E0A96D]"
                />
                <span className="text-xs text-slate-200">Asthma / Inhaler</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={heartCondition}
                  onChange={(e) => setHeartCondition(e.target.checked)}
                  className="rounded border-white/20 text-[#E0A96D]"
                />
                <span className="text-xs text-slate-200">Cardiovascular</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pregnancy}
                  onChange={(e) => setPregnancy(e.target.checked)}
                  className="rounded border-white/20 text-[#E0A96D]"
                />
                <span className="text-xs text-slate-200">Pregnancy</span>
              </label>
            </div>

            {(asthma || heartCondition || pregnancy || hasMedical) && (
              <textarea
                value={medicalDetails}
                onChange={(e) => setMedicalDetails(e.target.value)}
                placeholder="Please describe any medical nuances (e.g., carrying personal EpiPen for bee stings, knee braces, etc.)..."
                className="w-full bg-black/60 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#E0A96D] resize-none h-16"
              />
            )}
          </div>

          {/* EMERGENCY CONTACT INFORMATION */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E0A96D]" />
              <span className="font-bold text-white text-xs">Emergency Contact (Not on Tour)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., David Miller"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Emergency Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E0A96D]"
                />
              </div>

              <div>
                <CustomDropdown
                  label="Relationship"
                  value={emergencyRelation}
                  options={RELATION_OPTIONS}
                  onChange={(val) => setEmergencyRelation(val)}
                />
              </div>
            </div>
          </div>

          {/* DIGITAL SIGNATURE */}
          <div className="p-4 rounded-2xl bg-[#0F382C]/30 border border-[#E0A96D]/40 text-xs space-y-3">
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-[#E0A96D]" />
              <span className="font-bold text-white text-xs">Electronic Signature & Legal Agreement</span>
            </div>

            <p className="text-[11px] text-slate-300">
              Type your full legal name below to execute this electronic waiver. By clicking "Sign & Proceed to Bank Transfer", you legally bind yourself and group members to these terms.
            </p>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="Full Legal Name (e.g., Sarah Elizabeth Jenkins)"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="w-full bg-black/60 border border-[#E0A96D]/50 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#E0A96D]"
              />
              <span className="absolute right-3 top-3 text-[10px] text-[#E0A96D] font-mono">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#0F382C] via-[#1a5b48] to-[#0F382C] hover:from-[#13493a] hover:to-[#22725a] border border-[#E0A96D]/50 text-[#E0A96D] hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign & Proceed to Bank Transfer</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default LiabilityWaiverModal;


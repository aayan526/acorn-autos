import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Calendar, Phone, Gauge, CircleDot, Lightbulb, Settings2, Car, ChevronDown, Check } from 'lucide-react';
import { MOT_CATEGORIES, CLIENT_IMAGES, GARAGE_INFO } from '../data/garageData';
import { GarageImage } from './common/GarageImage';

interface MotCentreSectionProps {
  onBookMot: () => void;
}

export const MotCentreSection: React.FC<MotCentreSectionProps> = ({ onBookMot }) => {
  const [activeCategory, setActiveCategory] = useState<string>(MOT_CATEGORIES[0].id);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'emissions':
        return <Gauge className="w-5 h-5" />;
      case 'brakes':
        return <ShieldCheck className="w-5 h-5" />;
      case 'tyres':
        return <CircleDot className="w-5 h-5" />;
      case 'lights':
        return <Lightbulb className="w-5 h-5" />;
      case 'steering':
        return <Settings2 className="w-5 h-5" />;
      case 'body-safety':
        return <Car className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const selectedCategoryData = MOT_CATEGORIES.find((c) => c.id === activeCategory) || MOT_CATEGORIES[0];

  return (
    <section id="mot-centre" className="py-20 bg-slate-900/60 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Driver & Vehicle Standards Agency (DVSA) Authorised</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Official VOSA-Approved Class 4 MOT Centre
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Acorn Autos is an independently licensed MOT testing station in Lower Wortley. We inspect petrol, diesel, and hybrid passenger cars, 4x4s, and small commercial vans with transparent, honest advice.
          </p>
        </div>

        {/* Feature Split: Real MOT Bay Visual + Key Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left: MOT Bay Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 aspect-[4/3]">
              <GarageImage
                src={CLIENT_IMAGES.motBay}
                alt="Acorn Autos VOSA MOT testing bay in Leeds"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Testing Bay 1 · Low Mills Road
                  </div>
                  <div className="text-sm font-bold text-white">
                    Automated Brake Roller & Emissions Rig
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Official Fee</span>
                  <span className="text-lg font-black text-white">£45.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: What You Get & Guarantees */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Stress-Free MOT Testing with Free 10-Day Retests
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nothing is worse than unexpected repair bills or confusing technical jargon. At Acorn Autos, our certified testers talk you through any advisories in plain English. If your car requires work, you get a free retest within 10 working days.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Automated VOSA Brake & Emission Diagnostics</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Computerised brake roller machines ensure precision balance readings for absolute safety on wet Leeds roads.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Free 10-Day Retest Policy</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    If remedial work is required, bring it back within 10 working days for a complimentary retest check.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">In-House Structural Welding & Repairs</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Unlike other test stations that send you away for welding or complex repairs, our technicians fix everything right here on site.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookMot}
                className="px-5 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book MOT Slot (£45)</span>
              </button>
              <a
                href={GARAGE_INFO.phoneHref}
                className="px-4 py-3 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>0113 279 9404</span>
              </a>
            </div>
          </div>

        </div>

        {/* Detailed Inspection Checklist Accordion / Tabs (All 6 Client-Specified Areas) */}
        <div className="mt-12 bg-slate-950 rounded-xl border border-slate-800 p-6 sm:p-8">
          <div className="border-b border-slate-800 pb-5 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              What Is Inspected During Your Class 4 MOT?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select an inspection category below to see standard testing checks and common fail points to check beforehand:
            </p>
          </div>

          {/* Interactive Category Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {MOT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3 rounded-lg text-left transition-all flex flex-col items-start gap-2 border cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 border-amber-400 text-white shadow-md'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`${activeCategory === cat.id ? 'text-amber-400' : 'text-slate-500'}`}>
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {cat.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Category Breakdown */}
          <div className="bg-slate-900/60 rounded-lg p-5 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">{getCategoryIcon(selectedCategoryData.id)}</span>
                  {selectedCategoryData.title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedCategoryData.summary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Mandatory Checklist Items */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Key Items Tested Under DVSA Schedule
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCategoryData.checkItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded border border-slate-800/60">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Failure Reasons */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Frequent MOT Failure Causes to Avoid
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCategoryData.commonFailReasons.map((fail) => (
                    <li key={fail} className="flex items-start gap-2 bg-amber-950/20 p-2.5 rounded border border-amber-500/20 text-slate-200">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span>{fail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-bold text-slate-300">Tip before arriving:</span> Top up your windscreen washer fluid and check that all light bulbs work. Over 18% of MOT failures in the UK are caused by simple blown bulbs!
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

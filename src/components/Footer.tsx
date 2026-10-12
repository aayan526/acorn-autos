import React from 'react';
import { ShieldCheck, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { GARAGE_INFO } from '../data/garageData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-700 to-emerald-950 border border-emerald-500/40 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1 leading-none">
                  ACORN AUTOS
                  <span className="text-[9px] font-semibold text-emerald-400 border border-emerald-500/40 rounded px-1">
                    LTD
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  Wortley MOT & Service Centre
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Family-run independent vehicle service and VOSA-approved Class 4 MOT testing station serving Wortley, Armley, Pudsey, and Greater Leeds for over 30 years.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VOSA MOT Station #Class 4</span>
            </div>
          </div>

          {/* Col 2: Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#mot-centre" className="hover:text-amber-400 transition-colors">Class 4 MOT Testing (£45)</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Full & Interim Car Servicing</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Engine Diagnostics & Fault Codes</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Air Conditioning Regas & Service</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Clutch Replacement & Flywheels</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Precision Structural Welding</a></li>
            </ul>
          </div>

          {/* Col 3: Hours & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Workshop Hours
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Monday – Friday:</span>
                <span className="text-white font-mono font-medium">8:30 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Saturday:</span>
                <span className="text-slate-500 font-mono">Closed</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sunday & Bank Holidays:</span>
                <span className="text-slate-500 font-mono">Closed</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Early car drop-off available from 8:30 AM on weekdays.
            </p>
          </div>

          {/* Col 4: Location & Direct Call */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Workshop Contact
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>4 Low Mills Rd, Lower Wortley, Leeds LS12 4UY, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={GARAGE_INFO.phoneHref} className="hover:text-amber-400 font-bold transition-colors">
                  0113 279 9404
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Mandatory Demo Disclaimer Banner */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center space-y-2">
          <p className="text-slate-400 font-medium text-xs">
            Design concept by Aayan Qasim — demo only, not the official site.
          </p>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Acorn Autos Ltd. All rights reserved. Registered independent garage & VOSA MOT testing facility in Leeds, West Yorkshire.
          </p>
        </div>
      </div>
    </footer>
  );
};

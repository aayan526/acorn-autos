import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, ExternalLink, Check } from 'lucide-react';
import { GARAGE_INFO } from '../data/garageData';
import { getGarageStatus } from '../utils/hours';

export const LocationHoursSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const status = getGarageStatus();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(GARAGE_INFO.address.full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Acorn Autos Ltd, 4 Low Mills Rd, Lower Wortley, Leeds LS12 4UY, UK'
  )}`;

  return (
    <section id="location" className="py-20 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Find Us in Wortley, West Leeds
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Workshop Location & Opening Hours
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Conveniently situated in Lower Wortley just off Whitehall Road, minutes from Leeds City Centre, the A6110 Outer Ring Road, and the M621 motorway.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours & Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Opening Status Card */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Workshop Status</span>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${status.badgeClass}`}>
                  {status.statusText}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {status.detailText}
              </p>

              {/* Hours Table */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                {GARAGE_INFO.hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-900/60 last:border-b-0"
                  >
                    <span className="font-medium text-slate-300">{item.day}</span>
                    <span
                      className={`font-mono font-semibold ${
                        item.isOpen ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Quick Actions Card */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Acorn Autos Ltd</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    4 Low Mills Rd<br />
                    Lower Wortley, Leeds<br />
                    West Yorkshire, LS12 4UY
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy Postcode</span>
                  )}
                </button>
              </div>

              {/* Driving Directions Note */}
              <div className="p-3 rounded-lg bg-slate-950 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1">
                  <span>Driving Directions:</span>
                </div>
                <p>
                  Turn off Whitehall Road onto Low Mills Road. Follow the road down 150 yards — Acorn Autos is situated on your left with dedicated customer parking spaces right outside the testing bay.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Map Top Bar */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">Lower Wortley, Leeds LS12 4UY</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">53.7845° N, 1.5950° W</span>
              </div>

              {/* Embedded Interactive OpenStreetMap iframe with customized view */}
              <div className="relative w-full h-[420px] bg-slate-950">
                <iframe
                  title="Acorn Autos Location Map in Lower Wortley Leeds"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-1.602%2C53.780%2C-1.588%2C53.789&layer=mapnik&marker=53.7845%2C-1.5950"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />

                {/* Overlay Pin Callout */}
                <div className="absolute top-4 left-4 bg-slate-950/95 backdrop-blur-md border border-slate-800 p-3 rounded-lg shadow-xl max-w-xs pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Acorn Autos Ltd</div>
                      <div className="text-[10px] text-slate-400">4 Low Mills Rd, Leeds</div>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive link */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-slate-700 hover:bg-slate-900 transition-colors shadow"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Map Footer Information */}
              <div className="p-4 bg-slate-950/80 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                <div>
                  <span className="font-bold text-slate-200 block">From City Centre:</span>
                  <span>10 mins via Whitehall Rd (A58)</span>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">From Outer Ring Rd:</span>
                  <span>3 mins from A6110 roundabout</span>
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Customer Parking:</span>
                  <span>Free on-site bay parking</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

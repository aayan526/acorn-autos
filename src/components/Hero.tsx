import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ShieldCheck, ChevronRight, ChevronLeft, CheckCircle2, Search, ArrowRight, Star } from 'lucide-react';
import { GARAGE_INFO, HERO_SLIDES } from '../data/garageData';
import { GarageImage } from './common/GarageImage';
import { VehicleLookupResult } from '../types';

interface HeroProps {
  onOpenBooking: (serviceId?: string, prefillReg?: string) => void;
  onVehicleSelected?: (vehicle: VehicleLookupResult) => void;
}

// Sample UK vehicle database for interactive registration lookup
const MOCK_VEHICLES: Record<string, VehicleLookupResult> = {
  'YK19XZP': {
    registration: 'YK19 XZP',
    make: 'Volkswagen',
    model: 'Golf 1.5 TSI EVO Match',
    year: 2019,
    fuelType: 'Petrol',
    colour: 'Deep Black Pearl',
    engineSize: '1498cc',
    motStatus: 'DUE_SOON',
    motExpiryDate: '24 April 2026',
    daysRemaining: 13,
  },
  'BD68VTY': {
    registration: 'BD68 VTY',
    make: 'Ford',
    model: 'Focus 1.0 EcoBoost Zetec',
    year: 2018,
    fuelType: 'Petrol',
    colour: 'Magnetic Grey',
    engineSize: '998cc',
    motStatus: 'VALID',
    motExpiryDate: '18 September 2026',
    daysRemaining: 160,
  },
  'LS124UY': {
    registration: 'LS12 4UY',
    make: 'Nissan',
    model: 'Qashqai 1.3 DIG-T N-Connecta',
    year: 2020,
    fuelType: 'Petrol',
    colour: 'Gun Metallic',
    engineSize: '1332cc',
    motStatus: 'EXPIRED',
    motExpiryDate: '02 April 2026',
    daysRemaining: -9,
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onVehicleSelected }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [regInput, setRegInput] = useState('');
  const [lookupResult, setLookupResult] = useState<VehicleLookupResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleRegSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanReg = regInput.toUpperCase().replace(/\s+/g, '');
    if (!cleanReg) return;

    setIsSearching(true);
    setLookupError('');
    setLookupResult(null);

    setTimeout(() => {
      setIsSearching(false);
      if (MOCK_VEHICLES[cleanReg]) {
        const vehicle = MOCK_VEHICLES[cleanReg];
        setLookupResult(vehicle);
        if (onVehicleSelected) onVehicleSelected(vehicle);
      } else {
        // Generate a plausible mock vehicle for any custom entered UK reg
        const formatted = cleanReg.length > 4 ? `${cleanReg.slice(0, 4)} ${cleanReg.slice(4)}` : cleanReg;
        const generatedVehicle: VehicleLookupResult = {
          registration: formatted,
          make: 'Vauxhall',
          model: 'Corsa 1.2 Turbo Elite Nav',
          year: 2021,
          fuelType: 'Petrol',
          colour: 'Silver',
          engineSize: '1199cc',
          motStatus: 'DUE_SOON',
          motExpiryDate: '28 May 2026',
          daysRemaining: 47,
        };
        setLookupResult(generatedVehicle);
        if (onVehicleSelected) onVehicleSelected(generatedVehicle);
      }
    }, 400);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 sm:pb-16 bg-slate-950 overflow-hidden">
      {/* Slider Background with Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <GarageImage
              src={slide.image}
              alt={slide.title}
              priority={idx === 0}
              className="w-full h-full object-cover"
            />
            {/* Measured deep green/navy scrim overlay for high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>VOSA-Approved MOT Testing Station #Class 4</span>
              <span className="hidden sm:inline text-emerald-500">·</span>
              <span className="hidden sm:inline text-slate-300">Wortley, Leeds Since 1990s</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Leeds’ Independent MOT & Servicing Specialists.
            </h1>

            {/* Concrete Value Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Serving Lower Wortley, Armley, Pudsey, and West Leeds for over 30 years. Dealer-quality mechanical repairs, class 4 MOTs, air-con regas, and precision welding at fair, transparent independent rates.
            </p>

            {/* Key Service Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Class 4 MOT tests carried out on-site</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Free 10-day MOT retest guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Original manufacturer (OE) quality parts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Same-day turnaround on most servicing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/25 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book MOT or Service</span>
              </button>

              <a
                href={GARAGE_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 transition-all duration-200 text-sm sm:text-base active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call 0113 279 9404</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors ml-1"
              >
                <span>Explore all 10 services</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Proof Inline */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 border-t border-slate-800/80 mt-4">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">4.8</span>
                <span className="text-slate-400">/ 5.0 Google Rating</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-300 font-medium">30+ Years Wortley Community Trust</span>
            </div>
          </div>

          {/* Right Column: Interactive UK Reg Checker & Quick Booking Portal */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl shadow-black/60 relative">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Check MOT & Quick Book
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enter vehicle reg to view status and reserve a bay slot
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Class 4</span>
                  <span className="text-[11px] text-slate-500 font-mono">£45 MOT</span>
                </div>
              </div>

              {/* Number Plate Input Form */}
              <form onSubmit={handleRegSearch} className="mt-4 space-y-3">
                <label htmlFor="reg-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Enter UK Vehicle Registration
                </label>
                
                {/* Yellow British Number Plate Style Input */}
                <div className="relative flex items-center rounded-lg bg-amber-400 p-1 shadow-inner border border-amber-300">
                  <div className="bg-blue-800 text-white flex flex-col items-center justify-center px-2 py-1.5 rounded-l text-[10px] font-bold select-none leading-none">
                    <span className="text-[9px] text-yellow-300">★</span>
                    <span className="mt-0.5">UK</span>
                  </div>
                  <input
                    id="reg-input"
                    type="text"
                    value={regInput}
                    onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                    placeholder="e.g. YK19 XZP"
                    maxLength={9}
                    className="w-full bg-transparent text-slate-950 font-mono font-black text-lg sm:text-xl tracking-widest px-3 py-1 focus:outline-none uppercase placeholder:text-slate-600/60"
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !regInput.trim()}
                    className="bg-slate-950 hover:bg-slate-900 text-white px-3 py-2 rounded font-bold text-xs transition-colors flex items-center gap-1 shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    {isSearching ? (
                      <span className="animate-spin text-xs">↻</span>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5 text-amber-400" />
                        <span>Check</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Try test reg: <button type="button" onClick={() => setRegInput('YK19 XZP')} className="text-amber-400 hover:underline">YK19 XZP</button> or <button type="button" onClick={() => setRegInput('BD68 VTY')} className="text-amber-400 hover:underline">BD68 VTY</button></span>
                </div>
              </form>

              {/* Vehicle Lookup Result Card */}
              {lookupResult && (
                <div className="mt-4 p-3.5 rounded-lg bg-slate-950/80 border border-slate-700/80 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                        {lookupResult.registration}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {lookupResult.make} {lookupResult.model}
                      </div>
                      <div className="text-xs text-slate-400">
                        {lookupResult.year} · {lookupResult.fuelType} · {lookupResult.colour}
                      </div>
                    </div>
                    
                    {/* MOT Status Indicator */}
                    <div className="text-right">
                      {lookupResult.motStatus === 'VALID' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          MOT Valid
                        </span>
                      )}
                      {lookupResult.motStatus === 'DUE_SOON' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse">
                          Due in {lookupResult.daysRemaining} Days
                        </span>
                      )}
                      {lookupResult.motStatus === 'EXPIRED' && (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-red-950 text-red-300 border border-red-500/40">
                          MOT Expired
                        </span>
                      )}
                      <div className="text-[10px] text-slate-400 mt-1">
                        Expires: {lookupResult.motExpiryDate}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking('mot-testing', lookupResult.registration)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow"
                  >
                    <span>Proceed to Book MOT Slot for {lookupResult.registration}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Quick Contact Line */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <span className="text-xs text-slate-400">
                  Prefer booking by phone? Call direct:{' '}
                  <a href={GARAGE_INFO.phoneHref} className="text-amber-400 font-bold hover:underline">
                    0113 279 9404
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls & Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.badge}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
              Slide {currentSlide + 1} of {HERO_SLIDES.length}: {HERO_SLIDES[currentSlide].badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

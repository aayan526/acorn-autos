import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { GARAGE_INFO } from '../data/garageData';
import { getGarageStatus } from '../utils/hours';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const status = getGarageStatus();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'MOT Centre', href: '#mot-centre' },
    { label: 'About Us', href: '#about' },
    { label: 'Customer Reviews', href: '#reviews' },
    { label: 'Hours & Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-white group whitespace-nowrap shrink-0"
              aria-label="Acorn Autos Ltd homepage"
            >
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-emerald-700 to-emerald-950 border border-emerald-500/40 flex items-center justify-center text-amber-400 shadow-inner group-hover:border-amber-400/60 transition-colors">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                  ACORN AUTOS
                  <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/40 rounded px-1 py-0.2 tracking-wider">
                    LTD
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
                  Wortley MOT & Service Centre
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Direct Actions (Call & Book) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={GARAGE_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-all duration-200 shadow-sm hover:border-slate-500 whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{GARAGE_INFO.phone}</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-md transition-all duration-200 shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book MOT / Service</span>
              </button>
            </div>

            {/* Mobile Controls (below 1024px) */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href={GARAGE_INFO.phoneHref}
                aria-label={`Call ${GARAGE_INFO.phone}`}
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 active:scale-95"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="w-9 h-9 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Tablet Menu Trigger (640px to 1023px) */}
            <div className="hidden sm:flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="w-10 h-10 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200 hover:text-white ml-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Header inside drawer - prevents logo double-up */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-emerald-700 to-emerald-950 border border-emerald-500/40 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white flex items-center gap-1.5 leading-none">
                  ACORN AUTOS
                  <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/40 rounded px-1 py-0.2">
                    LTD
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Lower Wortley, Leeds LS12
                </span>
              </div>
            </div>

            {/* Prominent Clean Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-3 rounded-lg text-lg font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-900/60 transition-colors border-b border-slate-900/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-normal">→</span>
              </button>
            ))}
          </div>

          {/* Bottom Actions & Trust Info in Mobile Menu */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Mon–Fri: 8:30 AM – 4:00 PM</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${status.badgeClass}`}>
                {status.statusText}
              </span>
            </div>

            <a
              href={GARAGE_INFO.phoneHref}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-slate-900 text-white font-bold text-base border border-slate-700 active:scale-98"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call 0113 279 9404</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 active:scale-98"
            >
              <Calendar className="w-5 h-5" />
              <span>Book MOT or Service Online</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>4 Low Mills Rd, Wortley, Leeds LS12 4UY</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

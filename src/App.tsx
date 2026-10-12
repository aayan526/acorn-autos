import React, { useState } from 'react';
import { Phone, Calendar } from 'lucide-react';
import { useLenisAndScroll } from './hooks/useLenisAndScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { ServicesSection } from './components/ServicesSection';
import { MotCentreSection } from './components/MotCentreSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingFlow } from './components/BookingFlow';
import { LocationHoursSection } from './components/LocationHoursSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GARAGE_INFO } from './data/garageData';

export default function App() {
  // Initialize Lenis smooth scroll and GSAP ScrollTrigger
  useLenisAndScroll();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('mot-testing');
  const [prefillReg, setPrefillReg] = useState<string>('');

  const handleOpenBooking = (serviceId?: string, reg?: string) => {
    if (serviceId) setSelectedServiceId(serviceId);
    if (reg) setPrefillReg(reg);
    setIsModalOpen(true);
  };

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation Bar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with photo slider & reg lookup */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onVehicleSelected={(v) => {
            setPrefillReg(v.registration);
          }}
        />

        {/* 2. Trust Stats & Animated Counters */}
        <TrustStats />

        {/* 3. Core Services Grid (All 10 services) */}
        <ServicesSection onSelectService={handleSelectServiceFromCard} />

        {/* 4. Official VOSA MOT Testing Centre */}
        <MotCentreSection onBookMot={() => handleOpenBooking('mot-testing')} />

        {/* 5. In-Page Full Interactive Booking Section */}
        <section id="booking" className="py-20 bg-slate-950 relative border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Direct Appointment Booking
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Reserve Your Workshop or MOT Bay Slot
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Fast online confirmation with no upfront payment. Pay at the desk upon collection.
              </p>
            </div>

            <BookingFlow
              initialServiceId={selectedServiceId}
              initialReg={prefillReg}
            />
          </div>
        </section>

        {/* 6. About Us & 30-Year Heritage */}
        <AboutSection />

        {/* 7. Verified Customer Reviews */}
        <TestimonialsSection />

        {/* 8. Opening Hours, Live Status & Location Map */}
        <LocationHoursSection />

        {/* 9. Contact Desk & FAQs */}
        <ContactSection />
      </main>

      {/* Footer with mandatory disclaimer */}
      <Footer />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceId={selectedServiceId}
        prefillReg={prefillReg}
      />

      {/* Mobile Sticky Quick Action Bar (Discreet, within 15% mobile viewport cap) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={GARAGE_INFO.phoneHref}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call 0113 279 9404</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950" />
          <span>Book MOT / Service</span>
        </button>
      </div>

    </div>
  );
}

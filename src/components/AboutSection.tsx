import React from 'react';
import { Award, ShieldCheck, HeartHandshake, MapPin, CheckCircle2 } from 'lucide-react';
import { CLIENT_IMAGES, GARAGE_INFO } from '../data/garageData';
import { GarageImage } from './common/GarageImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid split: Story & Workshop Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Workshop Photos Collage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 aspect-[16/10]">
              <GarageImage
                src={CLIENT_IMAGES.mainGarage}
                alt="Acorn Autos garage workshop exterior and bays on Low Mills Road"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-white bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur border border-slate-800">
                4 Low Mills Road, Lower Wortley, Leeds
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow bg-slate-900 aspect-[4/3]">
                <GarageImage
                  src={CLIENT_IMAGES.workshopLift}
                  alt="Vehicle on hydraulic ramp inside Acorn Autos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow bg-slate-900 aspect-[4/3]">
                <GarageImage
                  src={CLIENT_IMAGES.contactGarage}
                  alt="Customer reception and bays at Acorn Autos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Over 3 Decades of Trusted Local Craftsmanship</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                An Independent Garage Built on Word-of-Mouth, Not Sales Targets.
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded over 30 years ago in Lower Wortley, <strong>Acorn Autos Ltd</strong> was established with a straightforward philosophy: provide Leeds motorists with honest, dealership-grade workmanship without the eye-watering main dealer invoices.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We don't operate on commission. Our technicians won't invent fake advisories or recommend parts your car doesn't need. Over 80% of our business comes from generational repeat customers across Wortley, Pudsey, Armley, Bramley, and Farnley who know their cars are in safe hands.
            </p>

            {/* Core Values Strip */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Genuine 'One-Stop Shop' Capability</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No subcontracting or driving between multiple specialists. We perform MOT testing, tyres, complex electrical diagnostics, clutch changes, and MOT welding in-house.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Manufacturer Warranty Protected</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Under UK Block Exemption, having your new car serviced at Acorn Autos protects your factory manufacturer warranty while saving up to 40% on labour.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">Convenient West Leeds Location</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Minutes from Whitehall Road and the Leeds Outer Ring Road (A6110). Drop off at 8:30 AM on your commute into Leeds centre and collect before 4:00 PM.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote attribution block */}
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
              <span className="font-bold text-white">"Our reputation is our livelihood.</span> If an advisory can wait 6 months, we'll tell you honestly. That's why Wortley drivers have trusted us for 30 years."
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

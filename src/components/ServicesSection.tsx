import React, { useState } from 'react';
import { ArrowRight, Check, Clock, Tag } from 'lucide-react';
import { SERVICES_LIST } from '../data/garageData';
import { GarageImage } from './common/GarageImage';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'servicing' | 'mechanical' | 'specialist'>('all');

  const filteredServices = SERVICES_LIST.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="services" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Subtle background ambient styling */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Complete Workshop Facilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Comprehensive Vehicle Services & Repairs
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We are a genuine one-stop garage in Lower Wortley. From routine annual servicing and official Class 4 MOTs to heavy clutch replacement and bespoke chassis welding.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Services ({SERVICES_LIST.length})
            </button>
            <button
              onClick={() => setFilter('servicing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'servicing'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MOT & Servicing
            </button>
            <button
              onClick={() => setFilter('mechanical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'mechanical'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mechanical Repairs
            </button>
            <button
              onClick={() => setFilter('specialist')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                filter === 'specialist'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Specialist & Welding
            </button>
          </div>
        </div>

        {/* Services Grid (All 10 services represented) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with zoom effect on hover */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <GarageImage
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle top gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                  
                  {/* Unboxed metadata line on photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800/80">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <Tag className="w-3.5 h-3.5" />
                      {service.priceEstimate}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Checklist Items */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {service.details.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-2.5 px-4 rounded-md bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Book {service.title.split(' ')[0]} Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Need a specialist job not listed here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Call our technicians directly at 0113 279 9404 for straightforward advice and honest quotes.
            </p>
          </div>
          <a
            href="tel:01132799404"
            className="px-5 py-2.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow shrink-0"
          >
            Speak to a Mechanic Now
          </a>
        </div>

      </div>
    </section>
  );
};

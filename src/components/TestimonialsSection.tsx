import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, GARAGE_INFO } from '../data/garageData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-900/50 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Verified Motorist Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Wortley & Leeds Drivers Say About Us
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We never pay for reviews or filter customer comments. Read genuine experiences from private car owners and local West Leeds commercial fleets.
            </p>
          </div>

          {/* Google Score Lockup */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <div className="w-12 h-12 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-amber-400 font-black text-xl">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white">4.8 star Google rating</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                54+ verified local motorist ratings
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{item.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Vehicle Metadata (Unboxed metadata style) */}
              <div className="pt-5 mt-4 border-t border-slate-900 flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {item.author}
                    {item.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" aria-label="Verified Customer" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.location}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-amber-400">
                    {item.serviceReceived}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.carModel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Review Submission Notice */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400">
            Have you had work done at our Wortley workshop recently? Search{' '}
            <strong className="text-slate-200">"Acorn Autos Ltd Leeds"</strong> on Google to leave your feedback.
          </p>
        </div>

      </div>
    </section>
  );
};

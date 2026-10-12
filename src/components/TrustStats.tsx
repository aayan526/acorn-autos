import React, { useEffect, useState, useRef } from 'react';
import { Award, ShieldCheck, Wrench, Users } from 'lucide-react';
import { GARAGE_INFO } from '../data/garageData';

export const TrustStats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate numbers smoothly
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setYearsCount(Math.round(ease * GARAGE_INFO.stats.yearsTrading));
            setRatingCount(Number((ease * GARAGE_INFO.stats.googleRating).toFixed(1)));
            setReviewsCount(Math.round(ease * GARAGE_INFO.stats.reviewsCount));
            setServicesCount(Math.round(ease * 10));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* Stat 1: Years in Business */}
          <div className="flex flex-col items-center sm:items-start pt-3 lg:pt-0 sm:px-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Established</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums font-mono">
              {yearsCount}+ <span className="text-xl sm:text-2xl font-bold text-amber-400 font-sans">Years</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Family-run garage serving Wortley & Leeds since the 1990s
            </p>
          </div>

          {/* Stat 2: Google Rating */}
          <div className="flex flex-col items-center sm:items-start pt-3 lg:pt-0 sm:px-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Users className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Reviews</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums font-mono">
              {ratingCount.toFixed(1)} <span className="text-amber-400 text-2xl font-sans">★</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Based on {reviewsCount}+ verified local motorist ratings
            </p>
          </div>

          {/* Stat 3: VOSA MOT Certified */}
          <div className="flex flex-col items-center sm:items-start pt-3 lg:pt-0 sm:px-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Testing Standard</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums font-mono">
              VOSA <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-sans">Class 4</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              DVSA-certified automated testing lane on Low Mills Road
            </p>
          </div>

          {/* Stat 4: Mechanical Specialisms */}
          <div className="flex flex-col items-center sm:items-start pt-3 lg:pt-0 sm:px-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Wrench className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Capability</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums font-mono">
              {servicesCount} <span className="text-xl sm:text-2xl font-bold text-slate-200 font-sans">Services</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              True one-stop shop: from tyres & air-con to welding & clutches
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

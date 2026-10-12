import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

interface GarageImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  priority?: boolean;
}

export const GarageImage: React.FC<GarageImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 select-none ${className}`}
      style={{
        aspectRatio: aspectRatio === 'auto' ? undefined : aspectRatio,
      }}
    >
      {/* Background industrial fallback mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-10 h-10 rounded-lg bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center text-amber-400 mb-2">
          <Wrench className="w-5 h-5 opacity-70" />
        </div>
        <span className="text-xs font-medium text-slate-400 tracking-wide line-clamp-1">
          Acorn Autos Workshop
        </span>
      </div>

      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // Graceful fallback to styled industrial container
            setHasError(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
};

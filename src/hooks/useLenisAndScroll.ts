import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenisAndScroll = () => {
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Reveal everything immediately
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('force-revealed');
      });
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Safety-net pattern: force reveal any element still hidden after 1.5s or on manual scroll
    const safetyNetTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.1) {
          el.classList.add('force-revealed');
        }
      });
    }, 1500);

    const handleScrollSafety = () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add('force-revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScrollSafety, { passive: true });

    return () => {
      clearTimeout(safetyNetTimer);
      window.removeEventListener('scroll', handleScrollSafety);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);
};

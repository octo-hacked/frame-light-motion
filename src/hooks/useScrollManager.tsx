import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export const useScrollManager = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with more conservative settings to avoid conflicts
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable for now to prevent conflicts
      touchMultiplier: 1,
      infinite: false,
      autoResize: true,
      wrapper: window,
      content: document.documentElement,
    });

    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger when the hook mounts
    ScrollTrigger.refresh();

    return () => {
      // Clean up
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const createScrollTrigger = (config: ScrollTrigger.StaticVars) => {
    return ScrollTrigger.create({
      ...config,
      invalidateOnRefresh: true,
      // Don't override scroller - let it use default
    });
  };

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  const scrollTo = (target: string | number, options?: any) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return {
    createScrollTrigger,
    refreshScrollTrigger,
    scrollTo,
    lenis: lenisRef.current,
  };
};

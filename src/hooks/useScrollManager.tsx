import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollManager = () => {
  useEffect(() => {
    // Simple setup - just refresh ScrollTrigger when the hook mounts
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTrigger instances when unmounting
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const createScrollTrigger = (config: ScrollTrigger.StaticVars) => {
    return ScrollTrigger.create({
      ...config,
      invalidateOnRefresh: true,
    });
  };

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  const scrollTo = (target: string | number, options?: any) => {
    // Simple scroll to implementation
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  return {
    createScrollTrigger,
    refreshScrollTrigger,
    scrollTo,
  };
};

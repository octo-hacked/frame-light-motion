import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollManager = () => {
  useEffect(() => {
    // Refresh ScrollTrigger when the hook mounts
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

  return {
    createScrollTrigger,
    refreshScrollTrigger,
  };
};
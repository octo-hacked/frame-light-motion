import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollContainer = ({ children, className = '' }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Don't set overflow hidden - let Lenis handle scrolling
    // Just ensure proper positioning for animations
    gsap.set(container, {
      position: 'relative'
    });

    // Refresh ScrollTrigger after container is set up
    ScrollTrigger.refresh();

    return () => {
      // Clean up on unmount
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container ||
            (container.contains(trigger.vars.trigger as Element))) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-container ${className}`}
    >
      {children}
    </div>
  );
};

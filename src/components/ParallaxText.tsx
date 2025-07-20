import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
}

export const ParallaxText = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  delay = 0
}: ParallaxTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Initial reveal animation
    const revealTl = gsap.timeline();
    revealTl.fromTo(element,
      { 
        opacity: 0, 
        y: direction === 'up' ? 50 : -50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2, 
        delay,
        ease: "power3.out" 
      }
    );

    // Scoped parallax scroll effect with reduced movement
    const moveDistance = direction === 'up' ? -50 * speed : 50 * speed; // Reduced from 100 to 50
    
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(element, {
          y: moveDistance * progress,
          ease: "none"
        });
      }
    });

    return () => {
      revealTl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [speed, direction, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};
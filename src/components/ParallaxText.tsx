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

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Initial reveal animation
    gsap.fromTo(element,
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

    // Parallax scroll effect
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    const moveDistance = direction === 'up' ? -100 * speed : 100 * speed;
    parallaxTl.to(element, {
      y: moveDistance,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed, direction, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};
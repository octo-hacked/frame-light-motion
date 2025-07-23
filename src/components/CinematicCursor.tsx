import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CinematicCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const flare = flareRef.current;
    
    if (!cursor || !cursorDot || !flare) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursor, {
        x: x - 20,
        y: y - 20,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursorDot, {
        x: x - 4,
        y: y - 4,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(flare, {
        x: x - 50,
        y: y - 50,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorDot, flare], {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorDot, flare], {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-50 mix-blend-difference">
      {/* Lens Flare */}
      <div
        ref={flareRef}
        className="fixed w-24 h-24 rounded-full bg-gradient-lens opacity-30 blur-sm"
        style={{ transform: 'translate(-50px, -50px)' }}
      />
      
      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border-2 border-primary rounded-full opacity-60"
        style={{ transform: 'translate(-20px, -20px)' }}
      />
      
      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-primary rounded-full"
        style={{ transform: 'translate(-4px, -4px)' }}
      />
    </div>
  );
};

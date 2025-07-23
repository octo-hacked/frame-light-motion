import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const chevron = chevronRef.current;
    
    if (!indicator || !chevron) return;

    // Floating animation
    gsap.to(indicator, {
      y: 10,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // Chevron pulse animation
    gsap.to(chevron, {
      scale: 1.1,
      opacity: 0.7,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // Reveal animation
    gsap.fromTo(indicator, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power3.out" }
    );
  }, []);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={indicatorRef}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
      onClick={handleScrollClick}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-sm font-light tracking-wider text-cinema-white/80 uppercase">
          Scroll
        </div>
        <div 
          ref={chevronRef}
          className="p-2 border border-primary/50 rounded-full bg-primary/10 backdrop-blur-sm"
        >
          <ChevronDown className="w-4 h-4 text-primary" />
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </div>
  );
};

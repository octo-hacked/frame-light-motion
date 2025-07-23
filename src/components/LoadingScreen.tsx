import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const filmStrip = filmStripRef.current;
    const logo = logoRef.current;
    const progress = progressRef.current;
    const counter = countRef.current;

    if (!container || !filmStrip || !logo || !progress || !counter) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Add a small delay before calling onComplete
        setTimeout(onComplete, 500);
      }
    });

    // Initial state
    gsap.set([logo, progress], { opacity: 0, y: 50 });
    gsap.set(filmStrip, { x: -100 });

    // Loading animation sequence
    tl
      // Film strip animation
      .to(filmStrip, {
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      // Logo fade in
      .to(logo, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4")
      // Progress bar fade in
      .to(progress, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6")
      // Progress animation with counter
      .to({}, {
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          const progressValue = this.progress() * 100;
          if (counter) {
            counter.textContent = Math.floor(progressValue).toString();
          }
          
          gsap.set(progress.querySelector('.progress-fill'), {
            scaleX: this.progress()
          });
        }
      })
      // Exit animation
      .to(container, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-cinema-black flex items-center justify-center overflow-hidden"
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-30 bg-gradient-film" />
      
      {/* Film strip border */}
      <div 
        ref={filmStripRef}
        className="absolute left-0 top-0 w-20 h-full bg-gradient-to-b from-cinema-gold via-cinema-orange to-cinema-gold opacity-20"
      >
        {/* Film perforations */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="w-4 h-8 bg-cinema-black mx-auto mt-4 first:mt-8 rounded-sm"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="block text-cinema-white font-light">WEB</span>
            <span className="block bg-gradient-cinematic bg-clip-text text-transparent animate-glow">
              ARTS
            </span>
          </h1>
          <p className="text-cinema-white/60 text-lg mt-4 font-light tracking-widest">
            CINEMATIC STORYTELLING
          </p>
        </div>

        {/* Progress */}
        <div ref={progressRef} className="w-80 mx-auto">
          {/* Counter */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-cinema-white/80 text-sm font-light tracking-wider">
              LOADING
            </span>
            <span className="text-cinema-gold font-mono text-sm">
              <span ref={countRef}>0</span>%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-px bg-cinema-white/20 overflow-hidden">
            <div 
              className="progress-fill absolute left-0 top-0 h-full bg-gradient-to-r from-cinema-gold to-cinema-orange origin-left scale-x-0"
            />
          </div>
          
          {/* Film frame indicator */}
          <div className="flex justify-center mt-6">
            <div className="w-8 h-6 border-2 border-cinema-white/30 rounded-sm relative">
              <div className="absolute inset-1 bg-cinema-gold/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

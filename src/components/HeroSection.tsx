import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingCamera } from './FloatingCamera';
import { ParallaxText } from './ParallaxText';
import { ScrollIndicator } from './ScrollIndicator';
import { CinematicCursor } from './CinematicCursor';
import { useScrollManager } from '@/hooks/useScrollManager';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { createScrollTrigger } = useScrollManager();

  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    const overlay = overlayRef.current;
    
    if (!container || !background || !overlay) return;

    // Initial page load animation
    const tl = gsap.timeline();
    
    tl.fromTo(background, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    )
    .fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=1"
    );

    // Scoped parallax background effect with proper bounds
    const scrollTrigger = createScrollTrigger({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(background, {
          yPercent: -30 * progress, // Reduced from -50 to prevent overflow
          ease: "none"
        });
      }
    });

    return () => {
      tl.kill();
      scrollTrigger?.kill();
    };
  }, [createScrollTrigger]);

  return (
    <>
      <CinematicCursor />
      <section 
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-cinema-black cursor-lens film-grain"
      >
        {/* Background with film grain */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-film"
        />
        
        {/* 3D Camera Animation */}
        <div className="absolute inset-0 opacity-20">
          <FloatingCamera />
        </div>
        
        {/* Cinematic Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-black/20 to-cinema-black/60"
        />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Main Heading */}
            <ParallaxText speed={0.3} delay={0.5} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-cinema-white font-light">Crafting</span>
                <span className="block bg-gradient-cinematic bg-clip-text text-transparent animate-glow">
                  Stories
                </span>
                <span className="block text-cinema-white/90 text-3xl md:text-4xl lg:text-5xl font-light mt-4">
                  One Frame at a Time
                </span>
              </h1>
            </ParallaxText>
            
            {/* Subtitle */}
            <ParallaxText speed={0.4} delay={1} className="mb-12">
              <p className="text-lg md:text-xl text-cinema-white/80 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                Professional video editor specializing in cinematic storytelling, 
                bringing vision to life through cutting-edge techniques and creative passion.
              </p>
            </ParallaxText>
            
            {/* CTA Buttons */}
            <ParallaxText speed={0.2} delay={1.5}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group px-8 py-4 bg-gradient-cinematic rounded-full font-semibold text-cinema-black hover:shadow-cinematic transition-all duration-500 transform hover:scale-105">
                  <span className="group-hover:text-cinema-black transition-colors">
                    View My Work
                  </span>
                </button>
                <button className="px-8 py-4 border border-cinema-white/30 rounded-full font-light text-cinema-white hover:bg-cinema-white/10 backdrop-blur-sm transition-all duration-500 transform hover:scale-105">
                  Get In Touch
                </button>
              </div>
            </ParallaxText>
            
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
        
        {/* Ambient Light Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </section>
    </>
  );
};
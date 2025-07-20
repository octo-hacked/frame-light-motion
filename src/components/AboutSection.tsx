import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoLoop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover rounded-lg opacity-80"
      loop
      muted
      playsInline
      autoPlay
    >
      {/* Placeholder for video - would be actual editing footage */}
      <source src="/editing-workspace.mp4" type="video/mp4" />
      {/* Fallback gradient for demo */}
      <div className="w-full h-full bg-gradient-lens opacity-50" />
    </video>
  );
};

const AnimatedWord = ({ word, index }: { word: string; index: number }) => {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (wordRef.current) {
      gsap.fromTo(wordRef.current,
        {
          opacity: 0,
          y: 30,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: wordRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [index]);

  return (
    <span 
      ref={wordRef}
      className="inline-block mr-2 transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {word}
    </span>
  );
};

const BioTimeline = () => {
  const timelineItems = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started my journey into video editing with a passion for storytelling and visual narrative."
    },
    {
      year: "2020",
      title: "Professional Growth",
      description: "Expanded into commercial work, collaborating with brands and creators to bring their visions to life."
    },
    {
      year: "2022",
      title: "Cinematic Focus",
      description: "Specialized in cinematic editing techniques, mastering color grading and advanced post-production workflows."
    },
    {
      year: "2024",
      title: "Today",
      description: "Continuing to push creative boundaries while delivering exceptional results for every project."
    }
  ];

  const bioText = "I'm a passionate video editor who believes every frame tells a story. With years of experience crafting compelling narratives, I specialize in transforming raw footage into cinematic masterpieces that captivate audiences and bring visions to life.".split(' ');

  return (
    <div className="space-y-12">
      {/* Bio Paragraph with word-by-word animation */}
      <div className="mb-16">
        <h3 className="text-2xl font-light text-cinema-gold mb-6">About Me</h3>
        <p className="text-lg text-cinema-white/80 leading-relaxed">
          {bioText.map((word, index) => (
            <AnimatedWord key={index} word={word} index={index} />
          ))}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <h3 className="text-2xl font-light text-cinema-gold mb-8">My Journey</h3>
        {timelineItems.map((item, index) => (
          <div key={index} className="relative pl-8 border-l border-cinema-gold/30">
            <div className="absolute -left-2 w-4 h-4 bg-cinema-gold rounded-full" />
            <div className="timeline-item">
              <div className="text-cinema-gold font-semibold text-sm mb-1">{item.year}</div>
              <h4 className="text-cinema-white font-medium text-lg mb-2">{item.title}</h4>
              <p className="text-cinema-white/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const portrait = portraitRef.current;

    if (!section || !leftPanel || !rightPanel || !portrait) return;

    // Pin the section for scroll-driven content
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      scrub: 1
    });

    // Parallax effect for left panel
    gsap.to(leftPanel, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Depth of field effect setup
    const handleMouseMove = (e: MouseEvent) => {
      const rect = portrait.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      const blur = Math.min(distance / maxDistance * 10, 10);
      
      gsap.to(portrait, {
        filter: `blur(${blur}px)`,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(portrait, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out"
      });
    };

    portrait.addEventListener('mousemove', handleMouseMove);
    portrait.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      portrait.removeEventListener('mousemove', handleMouseMove);
      portrait.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-cinema-black relative overflow-hidden"
    >
      {/* Split Screen Layout */}
      <div className="flex h-screen">
        
        {/* Left Panel - Bio Timeline */}
        <div 
          ref={leftPanelRef}
          className="w-1/2 p-12 overflow-y-auto scrollbar-hide"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          <div className="max-w-lg mx-auto pt-20">
            <BioTimeline />
          </div>
        </div>

        {/* Right Panel - 3D Portrait & Video */}
        <div 
          ref={rightPanelRef}
          className="w-1/2 relative flex flex-col"
        >
          {/* 3D Portrait Section - Temporarily simplified */}
          <div 
            ref={portraitRef}
            className="h-1/2 relative cursor-pointer bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20 flex items-center justify-center"
            onMouseEnter={() => setIsPortraitHovered(true)}
            onMouseLeave={() => setIsPortraitHovered(false)}
          >
            <div className="w-32 h-32 rounded-full bg-cinema-gold/30 flex items-center justify-center">
              <div className="text-cinema-gold text-4xl">👤</div>
            </div>
            
            {/* Overlay Info */}
            <div className="absolute top-6 left-6 z-10">
              <h2 className="text-3xl font-light text-cinema-white mb-2">
                The Editor Behind
              </h2>
              <h2 className="text-3xl font-bold bg-gradient-cinematic bg-clip-text text-transparent">
                The Magic
              </h2>
            </div>

            {/* Hover Instruction */}
            <div className="absolute bottom-6 right-6 text-cinema-white/60 text-sm">
              Hover for effect
            </div>
          </div>

          {/* Video Loop Section */}
          <div className="h-1/2 p-6 bg-cinema-black/50">
            <div className="h-full rounded-lg overflow-hidden shadow-film">
              <VideoLoop />
            </div>
            
            {/* Video Caption */}
            <div className="mt-4 text-center">
              <p className="text-cinema-white/70 text-sm">
                Behind the scenes: Crafting the perfect edit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    </section>
  );
};
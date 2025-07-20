import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 3D Portrait Mesh Component
const PortraitMesh = ({ morphProgress }: { morphProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.SphereGeometry;
      const vertices = geometry.attributes.position.array;

      // Apply wireframe morphing effect
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        // Morphing calculation based on progress
        const noise = Math.sin(x * 2 + y * 2 + Date.now() * 0.001) * morphProgress * 0.1;
        vertices[i + 2] = z + noise;
      }

      geometry.attributes.position.needsUpdate = true;
    }
  }, [morphProgress]);

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#D4AF37"
        wireframe={morphProgress > 0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const VideoSnippet = ({ src, delay = 0 }: { src: string; delay?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Stagger animation for video snippets
    gsap.fromTo(container,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className="relative h-32 rounded-lg overflow-hidden shadow-film bg-cinema-black/20">
      {/* Simulated video content with gradient */}
      <div className="w-full h-full bg-gradient-to-br from-cinema-gold/30 to-cinema-orange/20 flex items-center justify-center">
        <div className="text-cinema-white/60 text-xs text-center px-2">
          {src === 'timeline' && '🎬 Timeline Editing'}
          {src === 'color' && '🎨 Color Grading'}
          {src === 'effects' && '✨ Visual Effects'}
          {src === 'audio' && '🎵 Audio Mixing'}
        </div>
      </div>

      {/* Play indicator */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </div>
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
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const portrait = portraitRef.current;

    if (!section || !leftPanel || !rightPanel || !portrait) return;

    // Clear any existing scroll triggers for this section
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    // Gentle parallax effect for left panel - scoped to this section only
    const leftPanelTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(leftPanel, {
          yPercent: -20 * progress, // Reduced movement
          ease: "none"
        });
      }
    });
    
    scrollTriggersRef.current.push(leftPanelTrigger);

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
      // Clean up only this section's scroll triggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
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
                        className="h-3/5 relative cursor-pointer bg-gradient-to-br from-cinema-black via-cinema-black/90 to-cinema-gold/10 flex items-center justify-center"
            onMouseEnter={() => setIsPortraitHovered(true)}
            onMouseLeave={() => setIsPortraitHovered(false)}
          >
                        {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
                <PortraitMesh morphProgress={isPortraitHovered ? 1 : 0} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
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

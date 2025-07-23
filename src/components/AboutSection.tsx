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
    if (meshRef.current && morphProgress > 0) {
      const geometry = meshRef.current.geometry as THREE.SphereGeometry;
      const positionAttribute = geometry.attributes.position;
      const vertices = positionAttribute.array as Float32Array;
      
      // Apply wireframe morphing effect
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];
        
        // Morphing calculation based on progress
        const noise = Math.sin(x * 3 + y * 3 + Date.now() * 0.003) * morphProgress * 0.15;
        vertices[i + 2] = z + noise;
      }
      
      positionAttribute.needsUpdate = true;
    }
  }, [morphProgress]);

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]} scale={1.5}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshPhongMaterial 
        color="#D4AF37" 
        wireframe={morphProgress > 0.3}
        transparent
        opacity={0.8}
        shininess={100}
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

  const getContent = () => {
    switch(src) {
      case 'timeline': return { icon: '🎬', text: 'Timeline Editing' };
      case 'color': return { icon: '����', text: 'Color Grading' };
      case 'effects': return { icon: '✨', text: 'Visual Effects' };
      case 'audio': return { icon: '🎵', text: 'Audio Mixing' };
      default: return { icon: '📹', text: 'Video Work' };
    }
  };

  const content = getContent();

  return (
    <div ref={containerRef} className="relative h-24 rounded-lg overflow-hidden shadow-film bg-cinema-black/20 hover:bg-cinema-black/40 transition-all duration-300">
      {/* Simulated video content with gradient */}
      <div className="w-full h-full bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/10 flex items-center justify-center">
        <div className="text-cinema-white/70 text-xs text-center px-2">
          <div className="text-lg mb-1">{content.icon}</div>
          <div className="font-light">{content.text}</div>
        </div>
      </div>
      
      {/* Play indicator */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-cinema-gold/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
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

const BioContent = () => {
  const bioText = "I'm a passionate video editor who believes every frame tells a story. With years of experience crafting compelling narratives, I specialize in transforming raw footage into cinematic masterpieces that captivate audiences and bring visions to life.".split(' ');

  const skills = [
    { name: "Video Editing", level: 95, icon: "🎬" },
    { name: "Color Grading", level: 90, icon: "🎨" },
    { name: "Motion Graphics", level: 85, icon: "✨" },
    { name: "Audio Post", level: 88, icon: "🎵" },
    { name: "3D Animation", level: 80, icon: "🎯" },
    { name: "Storytelling", level: 92, icon: "📖" }
  ];

  const achievements = [
    "300+ Projects Completed",
    "50+ Happy Clients",
    "8+ Years Experience",
    "Award-Winning Work"
  ];

  return (
    <div className="space-y-8">
      {/* Bio Paragraph */}
      <div className="mb-8">
        <h3 className="text-3xl font-light text-cinema-gold mb-6">About Me</h3>
        <p className="text-lg text-cinema-white/80 leading-relaxed mb-8">
          {bioText.map((word, index) => (
            <AnimatedWord key={index} word={word} index={index} />
          ))}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h4 className="text-xl font-light text-cinema-gold mb-6">Core Skills</h4>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="text-cinema-white/90 font-medium">{skill.name}</span>
                </div>
                <span className="text-cinema-gold font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-cinema-white/10 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cinema-gold to-cinema-orange transition-all duration-1000 group-hover:from-cinema-orange group-hover:to-cinema-gold"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h4 className="text-xl font-light text-cinema-gold mb-6">Achievements</h4>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-cinema-white/5 rounded-lg p-4 border border-cinema-white/10 hover:border-cinema-gold/30 transition-all duration-300 group"
            >
              <div className="text-cinema-white/80 text-sm text-center group-hover:text-cinema-gold transition-colors">
                {achievement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-gradient-to-r from-cinema-gold/10 to-cinema-orange/10 rounded-lg p-6 border border-cinema-gold/20">
        <h4 className="text-lg font-semibold text-cinema-gold mb-3">My Philosophy</h4>
        <p className="text-cinema-white/80 text-sm leading-relaxed italic">
          "Every project is a chance to tell a unique story. I don't just edit videos—I craft experiences that resonate with audiences and bring creative visions to life through the power of cinematic storytelling."
        </p>
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
          yPercent: -15 * progress,
          ease: "none"
        });
      }
    });
    
    scrollTriggersRef.current.push(leftPanelTrigger);

    // Section entrance animation
    gsap.fromTo(section, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
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
        
        {/* Left Panel - Bio Content */}
        <div
          ref={leftPanelRef}
          className="w-1/2 p-8 lg:p-12 overflow-y-auto scrollbar-hide"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          <div className="max-w-lg mx-auto pt-16">
            <BioContent />
          </div>
        </div>

        {/* Right Panel - 3D Portrait & Video */}
        <div 
          ref={rightPanelRef}
          className="w-1/2 relative flex flex-col"
        >
          {/* 3D Portrait Section with Three.js */}
          <div 
            ref={portraitRef}
            className="h-3/5 relative cursor-pointer bg-gradient-to-br from-cinema-black via-cinema-black/90 to-cinema-gold/10 flex items-center justify-center"
            onMouseEnter={() => setIsPortraitHovered(true)}
            onMouseLeave={() => setIsPortraitHovered(false)}
          >
            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#D4AF37" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FFA500" />
                <PortraitMesh morphProgress={isPortraitHovered ? 1 : 0} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={isPortraitHovered ? 2 : 0.5}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
            </div>
            
            {/* Overlay Info */}
            <div className="absolute top-6 left-6 z-10">
              <h2 className="text-2xl md:text-3xl font-light text-cinema-white mb-2">
                The Editor Behind
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-cinematic bg-clip-text text-transparent">
                The Magic
              </h2>
            </div>

            {/* Hover Instruction */}
            <div className="absolute bottom-6 right-6 text-cinema-white/60 text-sm">
              Hover to morph
            </div>
            
            {/* Depth of field overlay */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-700" 
              style={{ 
                backdropFilter: isPortraitHovered ? 'blur(3px)' : 'blur(0px)',
                background: isPortraitHovered 
                  ? 'radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.4) 80%)' 
                  : 'transparent'
              }} 
            />
          </div>

          {/* Video Snippets Section */}
          <div className="h-2/5 p-6 bg-cinema-black/90">
            <h3 className="text-cinema-gold text-lg font-light mb-6 text-center">
              Silent Work Sessions
            </h3>
            
            {/* Grid of video snippets */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <VideoSnippet src="timeline" delay={0} />
              <VideoSnippet src="color" delay={0.2} />
              <VideoSnippet src="effects" delay={0.4} />
              <VideoSnippet src="audio" delay={0.6} />
            </div>
            
            {/* Caption */}
            <div className="text-center">
              <p className="text-cinema-white/60 text-xs">
                Live editing sessions • Silent workflow • Behind the scenes
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

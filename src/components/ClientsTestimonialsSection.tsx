import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Client brands data
const clientBrands = [
  { name: 'Nike', logo: '🏃', color: '#FF6900' },
  { name: 'Apple', logo: '🍎', color: '#007AFF' },
  { name: 'Netflix', logo: '🎬', color: '#E50914' },
  { name: 'Spotify', logo: '🎵', color: '#1DB954' },
  { name: 'Google', logo: '🔍', color: '#4285F4' },
  { name: 'Microsoft', logo: '💻', color: '#00BCF2' },
  { name: 'Adobe', logo: '🎨', color: '#FF0000' },
  { name: 'Meta', logo: '📘', color: '#1877F2' },
  { name: 'Tesla', logo: '⚡', color: '#CC0000' },
  { name: 'Amazon', logo: '📦', color: '#FF9900' },
  { name: 'YouTube', logo: '📺', color: '#FF0000' },
  { name: 'TikTok', logo: '🎭', color: '#000000' },
  { name: 'Samsung', logo: '📱', color: '#1428A0' },
  { name: 'Sony', logo: '🎮', color: '#0070D1' },
  { name: 'Warner', logo: '🎪', color: '#FFD700' }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Creative Director',
    company: 'Nike',
    avatar: '👩‍💼',
    rating: 5,
    text: "The editing quality exceeded our expectations. Every cut was purposeful, every transition seamless. This editor truly understands brand storytelling and how to capture our audience's attention.",
    videoQuote: "Working with this team was absolutely incredible. The attention to detail and creative vision brought our campaign to life.",
    project: 'Nike Air Revolution Campaign',
    duration: '45s',
    waveform: [0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.7, 0.6, 0.8, 0.2, 0.4, 0.9, 0.5, 0.3, 0.7, 0.8, 0.4, 0.6, 0.2, 0.9]
  },
  {
    id: 2,
    name: 'Marcus Chen',
    position: 'Film Director',
    company: 'Independent',
    avatar: '👨‍🎬',
    rating: 5,
    text: "Incredible storytelling through editing. The pacing and rhythm transformed our raw footage into a compelling narrative that resonated with audiences worldwide.",
    videoQuote: "This editor has an innate understanding of visual storytelling. Every frame serves the narrative perfectly.",
    project: 'Midnight Chronicles',
    duration: '38s',
    waveform: [0.3, 0.7, 0.5, 0.9, 0.2, 0.8, 0.4, 0.6, 0.7, 0.3, 0.9, 0.5, 0.2, 0.8, 0.4, 0.6, 0.7, 0.3, 0.5, 0.9]
  },
  {
    id: 3,
    name: 'Alex Rivera',
    position: 'Content Manager',
    company: 'Spotify',
    avatar: '👨‍💻',
    rating: 5,
    text: "Professional, creative, and delivered exactly what we envisioned. The color grading and sound design perfectly complemented our brand aesthetic.",
    videoQuote: "The technical expertise combined with creative vision made this collaboration outstanding.",
    project: 'Acoustic Sessions Series',
    duration: '42s',
    waveform: [0.4, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.2, 0.6, 0.8, 0.4, 0.7, 0.3, 0.9, 0.5, 0.6, 0.2, 0.8, 0.4, 0.7]
  },
  {
    id: 4,
    name: 'Emily Davis',
    position: 'Marketing Director',
    company: 'Apple',
    avatar: '👩‍💼',
    rating: 5,
    text: "Exceptional attention to detail and brand consistency. The final product perfectly captured our premium aesthetic and messaging strategy.",
    videoQuote: "This level of craftsmanship and attention to our brand guidelines was exactly what we needed.",
    project: 'Product Launch Video',
    duration: '52s',
    waveform: [0.5, 0.3, 0.8, 0.6, 0.4, 0.9, 0.2, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.2, 0.8, 0.5, 0.6, 0.3]
  }
];

// 3D Brand Logo Component
const BrandLogo3D = ({ brand, position, index }: { 
  brand: any; 
  position: [number, number, number];
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + index * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 0.2]} />
      <meshPhongMaterial 
        color={brand.color} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

// 3D Brand Wall Component
const BrandWall3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const positions: [number, number, number][] = [];
  
  // Create a 3D wall of brand positions
  for (let i = 0; i < clientBrands.length; i++) {
    const angle = (i / clientBrands.length) * Math.PI * 2;
    const radius = 8;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 6;
    positions.push([x, y, z]);
  }

  return (
    <group ref={groupRef}>
      {clientBrands.map((brand, index) => (
        <BrandLogo3D 
          key={brand.name}
          brand={brand}
          position={positions[index]}
          index={index}
        />
      ))}
    </group>
  );
};

// Waveform Visualization Component
const Waveform = ({ 
  waveformData, 
  isPlaying, 
  progress 
}: { 
  waveformData: number[]; 
  isPlaying: boolean;
  progress: number;
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveformRef.current) return;

    const bars = waveformRef.current.children;
    
    if (isPlaying) {
      Array.from(bars).forEach((bar, index) => {
        const element = bar as HTMLElement;
        const delay = index * 0.05;
        
        gsap.to(element, {
          scaleY: 0.3 + waveformData[index % waveformData.length] * 0.7,
          duration: 0.1,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    } else {
      Array.from(bars).forEach((bar) => {
        gsap.killTweensOf(bar);
        gsap.to(bar, {
          scaleY: 0.3,
          duration: 0.3
        });
      });
    }

    return () => {
      Array.from(bars).forEach((bar) => {
        gsap.killTweensOf(bar);
      });
    };
  }, [isPlaying, waveformData]);

  return (
    <div 
      ref={waveformRef}
      className="flex items-end space-x-1 h-16 px-4"
    >
      {Array.from({ length: 40 }).map((_, index) => {
        const isActive = progress > (index / 40);
        return (
          <div
            key={index}
            className="w-1 bg-gradient-to-t from-cinema-gold to-cinema-orange rounded-full transition-all duration-300"
            style={{
              height: '100%',
              opacity: isActive ? 1 : 0.3,
              transform: 'scaleY(0.3)'
            }}
          />
        );
      })}
    </div>
  );
};

// Chat Bubble with Typing Effect
const ChatBubble = ({ 
  testimonial, 
  isVisible 
}: { 
  testimonial: any; 
  isVisible: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let index = 0;
    const fullText = testimonial.text;
    
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isVisible, testimonial.text]);

  return (
    <div className="bg-gray-800 rounded-xl md:rounded-2xl rounded-bl-sm p-4 md:p-6 shadow-xl relative max-w-2xl mx-4 md:mx-0">
      {/* Avatar */}
      <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
        <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-cinema-gold to-cinema-orange rounded-full flex items-center justify-center text-lg md:text-2xl">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm md:text-base">{testimonial.name}</h4>
          <p className="text-gray-400 text-xs md:text-sm">{testimonial.position} at {testimonial.company}</p>
        </div>
      </div>

      {/* Message */}
      <div className="text-gray-300 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-0.5 h-4 md:h-5 bg-cinema-gold ml-1 animate-pulse" />
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-cinema-gold fill-current" />
        ))}
      </div>

      {/* Chat tail */}
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-gray-800 transform rotate-45" />
    </div>
  );
};

// Video Testimonial Reel Component
const VideoTestimonialReel = ({ 
  testimonial, 
  isActive,
  onPlayToggle 
}: {
  testimonial: any;
  isActive: boolean;
  onPlayToggle: () => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.01;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    onPlayToggle();
  };

  return (
    <div className={`relative w-full max-w-80 h-64 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
      isActive ? 'md:scale-105' : 'md:scale-95 md:opacity-70'
    }`}>
      {/* Video Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Mock Video Content */}
        <div className="text-center">
          <div className="text-3xl md:text-6xl mb-2 md:mb-4">{testimonial.avatar}</div>
          <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2">{testimonial.name}</h3>
          <p className="text-gray-400 text-xs md:text-sm">{testimonial.company}</p>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-12 md:w-16 h-12 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {isPlaying ? (
              <Pause className="w-4 md:w-6 h-4 md:h-6 text-white" />
            ) : (
              <Play className="w-4 md:w-6 h-4 md:h-6 text-white ml-1" />
            )}
          </div>
        </button>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4">
          {/* Waveform */}
          <div className="hidden md:block">
            <Waveform
              waveformData={testimonial.waveform}
              isPlaying={isPlaying}
              progress={progress}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between mt-1 md:mt-2">
            <div className="flex items-center space-x-1 md:space-x-2">
              <button
                onClick={handlePlayToggle}
                className="p-1 text-white hover:text-cinema-gold transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3 md:w-4 h-3 md:h-4" />
                ) : (
                  <Play className="w-3 md:w-4 h-3 md:h-4" />
                )}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 text-white hover:text-cinema-gold transition-colors hidden md:block"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <span className="text-xs text-white/70">{testimonial.duration}</span>
            </div>

            <Quote className="w-3 md:w-4 h-3 md:h-4 text-cinema-gold" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-cinema-gold transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Client Logo Carousel
const ClientLogoCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Infinite scroll animation
    gsap.to(carousel, {
      x: -carousel.scrollWidth / 2,
      duration: 30,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <div className="overflow-hidden py-8">
      <div 
        ref={carouselRef}
        className="flex space-x-12 whitespace-nowrap"
        style={{ width: 'fit-content' }}
      >
        {/* Double the brands for seamless loop */}
        {[...clientBrands, ...clientBrands].map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex-shrink-0 flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-300"
          >
            <span className="text-2xl">{brand.logo}</span>
            <span className="text-lg font-medium">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ClientsTestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showChatBubble, setShowChatBubble] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Apple-style scroll reveal
    gsap.fromTo(section,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Trigger chat bubble after section is visible
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      onEnter: () => setShowChatBubble(true),
      onLeave: () => setShowChatBubble(false)
    });
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-cinema-black to-gray-900 py-20 relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-cinema-white mb-6">
          <span className="bg-gradient-cinematic bg-clip-text text-transparent">Client</span> Love & Trust
        </h2>
        <p className="text-xl text-cinema-white/70 max-w-3xl mx-auto leading-relaxed">
          Building lasting relationships through exceptional work. See what industry leaders 
          and creative professionals say about our collaboration.
        </p>
      </div>

      {/* Client Logos Carousel */}
      <div className="mb-20">
        <h3 className="text-2xl font-semibold text-center text-white mb-8">
          Trusted by Industry Leaders
        </h3>
        <ClientLogoCarousel />
      </div>

      {/* 3D Brand Wall - Hidden on mobile for performance */}
      <div className="hidden md:block h-64 mb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-transparent to-cinema-black z-10 pointer-events-none" />
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <BrandWall3D />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Video Testimonials Reel */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <MessageCircle className="w-6 h-6 text-cinema-gold mr-3" />
            <h3 className="text-2xl font-semibold text-white">Video Testimonials</h3>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="px-4 mb-4">
              <div className="w-full max-w-sm mx-auto">
                <VideoTestimonialReel
                  testimonial={testimonials[activeTestimonial]}
                  isActive={true}
                  onPlayToggle={() => {}}
                />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-cinema-gold' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-6 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <VideoTestimonialReel
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === activeTestimonial}
                  onPlayToggle={() => {}}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat-style Testimonial */}
        <div className="flex justify-center mb-20">
          <ChatBubble 
            testimonial={testimonials[activeTestimonial]}
            isVisible={showChatBubble}
          />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Your project deserves the same level 
            of excellence that our clients have come to expect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-cinema-gold text-cinema-black font-semibold rounded-full hover:bg-cinema-gold/90 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
            <button className="px-8 py-4 border border-cinema-white/30 text-cinema-white font-semibold rounded-full hover:bg-cinema-white/10 transition-all duration-300 transform hover:scale-105">
              View More Testimonials
            </button>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
    </section>
  );
};

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Layers, 
  Clock, 
  Star, 
    CheckCircle,
  ArrowRight,
  Play,
  Settings,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Service data with enhanced details
const services = [
  {
    id: 'editing',
    title: 'Video Editing',
    icon: Scissors,
    shortDesc: 'Professional video editing and storytelling',
    price: 'From $500',
    gradient: ['#1a1a2e', '#16213e', '#0f3460'],
    accentColor: '#00d4aa',
    features: [
      'Narrative Structure & Pacing',
      'Multi-camera Editing',
      'Audio Synchronization',
      'Rough & Fine Cut Delivery',
      'Client Revision Rounds',
      'Export in Multiple Formats'
    ],
    details: {
      description: 'Transform raw footage into compelling stories with expert pacing, seamless transitions, and professional polish.',
      process: 'Assembly Edit → Rough Cut → Fine Cut → Color Correction → Audio Mix → Final Delivery',
      timeline: '3-7 business days',
      includes: 'Source organization, proxy creation, multiple export formats, project files'
    },
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Avid Media Composer'],
    animation: 'slice'
  },
  {
    id: 'color',
    title: 'Color Grading',
    icon: Palette,
    shortDesc: 'Cinematic color correction and grading',
    price: 'From $300',
    gradient: ['#2d1b69', '#11998e', '#38ef7d'],
    accentColor: '#ff6b6b',
    features: [
      'Primary Color Correction',
      'Secondary Color Grading',
      'LUT Creation & Application',
      'Skin Tone Optimization',
      'Mood & Atmosphere Enhancement',
      'Consistency Across Shots'
    ],
    details: {
      description: 'Enhance the visual impact of your footage with professional color grading that sets the mood and elevates production value.',
      process: 'Analysis → Primary Correction → Secondary Grading → LUT Application → Final Review',
      timeline: '2-4 business days',
      includes: 'Custom LUTs, before/after comparisons, multiple look variations'
    },
    tools: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Final Cut Pro'],
    animation: 'dropper'
  },
  {
    id: 'vfx',
    title: 'Visual Effects',
    icon: Sparkles,
    shortDesc: 'Motion graphics and visual effects',
    price: 'From $800',
    gradient: ['#667eea', '#764ba2', '#f093fb'],
    accentColor: '#ffd700',
    features: [
      'Compositing & Keying',
      'Motion Tracking',
      'Particle Effects',
      'Environment Extensions',
      'Clean-up & Removal',
      '3D Integration'
    ],
    details: {
      description: 'Bring impossible to life with seamless visual effects, from subtle enhancements to spectacular supernatural elements.',
      process: 'Pre-visualization → Tracking → Compositing → Effects → Integration → Final Render',
      timeline: '5-10 business days',
      includes: 'Pre-viz mockups, multiple iterations, source files, tutorial documentation'
    },
    tools: ['After Effects', 'Nuke', 'Cinema 4D', 'Blender'],
    animation: 'sparkle'
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    icon: Layers,
    shortDesc: 'Animated graphics and typography',
    price: 'From $400',
    gradient: ['#ff9a9e', '#fecfef', '#fecfef'],
    accentColor: '#4facfe',
    features: [
      'Logo Animation',
      'Typography Animation',
      'Infographic Design',
      'Lower Thirds & Titles',
      'Explainer Animations',
      'Brand Integration'
    ],
    details: {
      description: 'Engage your audience with dynamic motion graphics that communicate complex ideas through beautiful animation.',
      process: 'Concept → Storyboard → Design → Animation → Sound Design → Final Export',
      timeline: '4-8 business days',
      includes: 'Style frames, animatics, multiple versions, source project files'
    },
    tools: ['After Effects', 'Cinema 4D', 'Illustrator', 'Photoshop'],
    animation: 'morph'
  }
];

// Animated Service Icon Component
const AnimatedServiceIcon = ({ 
  service, 
  isHovered, 
  isActive 
}: { 
  service: any; 
  isHovered: boolean;
  isActive: boolean;
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const IconComponent = service.icon;

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    if (isHovered) {
      switch (service.animation) {
        case 'slice':
          gsap.to(icon, {
            rotation: 45,
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
          break;
        case 'dropper':
          gsap.to(icon, {
            y: -10,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });
          // Color dropper animation
          gsap.to(icon.querySelector('svg'), {
            filter: 'hue-rotate(180deg)',
            duration: 0.5,
            repeat: 1,
            yoyo: true
          });
          break;
        case 'sparkle':
          gsap.to(icon, {
            scale: 1.3,
            rotation: 360,
            duration: 0.6,
            ease: 'power2.out'
          });
          break;
        case 'morph':
          gsap.to(icon, {
            scale: 1.2,
            skewX: 10,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
          });
          break;
      }
    } else {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        y: 0,
        skewX: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(icon.querySelector('svg'), {
        filter: 'hue-rotate(0deg)',
        duration: 0.3
      });
    }
  }, [isHovered, service.animation]);

  return (
    <div 
      ref={iconRef}
      className="transition-all duration-300"
      style={{ color: isActive ? service.accentColor : '#ffffff' }}
    >
      <IconComponent className="w-8 h-8" />
    </div>
  );
};

// 3D Service Card Component
const ServiceCard = ({ 
  service, 
  index, 
  isActive, 
  onHover, 
  onLeave,
  onClick 
}: {
  service: any;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 100, 
        rotationY: -90,
        scale: 0.8 
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -20,
        rotationY: 5,
        rotationX: 5,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onClick();
  };

  return (
    <div
      ref={cardRef}
      className="relative w-80 h-96 cursor-pointer perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card Container with Flip Animation */}
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-gpu ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${service.gradient[0]}, ${service.gradient[1]}, ${service.gradient[2]})`,
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/20 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border border-white/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <AnimatedServiceIcon 
                service={service} 
                isHovered={isHovered}
                isActive={isActive}
              />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{service.price}</div>
                <div className="text-sm text-white/70">Starting from</div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/80 leading-relaxed">{service.shortDesc}</p>
            </div>

            {/* Features Preview */}
            <div className="flex-1 mb-6">
              <div className="space-y-2">
                {service.features.slice(0, 3).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" style={{ color: service.accentColor }} />
                    <span className="text-white/90 text-sm">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-white/60 text-sm">+{service.features.length - 3} more features</div>
                )}
              </div>
            </div>

            {/* Flip Indicator */}
            <div className="flex items-center justify-center text-white/60 text-sm">
              <span>Click to see details</span>
              <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden rotate-y-180"
          style={{ 
            background: `linear-gradient(135deg, ${service.gradient[2]}, ${service.gradient[1]}, ${service.gradient[0]})`,
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="p-6 h-full flex flex-col text-white">
            {/* Back Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{service.title} Details</h3>
              <button className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Content */}
            <div className="flex-1 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: service.accentColor }}>Description</h4>
                <p className="text-white/80">{service.details.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2" style={{ color: service.accentColor }}>Process</h4>
                <p className="text-white/80">{service.details.process}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: service.accentColor }}>Timeline</h4>
                  <p className="text-white/80">{service.details.timeline}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: service.accentColor }}>Tools</h4>
                  <p className="text-white/80">{service.tools.join(', ')}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2" style={{ color: service.accentColor }}>Includes</h4>
                <p className="text-white/80">{service.details.includes}</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4">
              <button 
                className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: service.accentColor,
                  color: service.gradient[0]
                }}
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Dynamic background gradient change
  useEffect(() => {
    const background = backgroundRef.current;
    if (!background || !activeService) return;

    const service = services.find(s => s.id === activeService);
    if (service) {
      gsap.to(background, {
        background: `radial-gradient(circle at 50% 50%, ${service.gradient[0]}20, ${service.gradient[1]}10, transparent)`,
        duration: 1,
        ease: "power2.out"
      });
    }
  }, [activeService]);

  const handleServiceHover = (serviceId: string) => {
    setActiveService(serviceId);
  };

  const handleServiceLeave = () => {
    setActiveService(null);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-cinema-black to-gray-900 py-20 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 transition-all duration-1000"
      />

      {/* Section Header */}
      <div className="text-center mb-20 px-6 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-cinema-white mb-6">
          <span className="bg-gradient-cinematic bg-clip-text text-transparent">Services</span> & Expertise
        </h2>
        <p className="text-xl text-cinema-white/70 max-w-3xl mx-auto leading-relaxed">
          Professional video production services tailored to bring your vision to life. 
          From concept to final delivery, I handle every aspect of post-production.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === service.id}
              onHover={() => handleServiceHover(service.id)}
              onLeave={handleServiceLeave}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-cinema-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-cinema-white/70 mb-8">
            Let's discuss your vision and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-cinema-gold text-cinema-black font-semibold rounded-full hover:bg-cinema-gold/90 transition-all duration-300 transform hover:scale-105">
              Get Free Consultation
            </button>
            <button className="px-8 py-4 border border-cinema-white/30 text-cinema-white font-semibold rounded-full hover:bg-cinema-white/10 transition-all duration-300 transform hover:scale-105">
              View Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Floating Elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Settings className="w-12 h-12 text-cinema-gold animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <Play className="w-8 h-8 text-cinema-orange animate-pulse" />
      </div>
    </section>
  );
};

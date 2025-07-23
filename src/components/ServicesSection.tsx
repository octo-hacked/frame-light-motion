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
  X,
  Monitor,
  Volume2,
  Camera,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Enhanced service data
const services = [
  {
    id: 'editing',
    title: 'Video Editing',
    icon: Scissors,
    shortDesc: 'Transform raw footage into compelling narratives',
    price: 'From $500',
    gradient: ['#FF6B6B', '#FF8E8E', '#FFB1B1'],
    accentColor: '#FF6B6B',
    features: [
      'Multi-camera Editing',
      'Advanced Transitions',
      'Narrative Structure',
      'Pacing & Rhythm',
      'Export Optimization'
    ],
    process: 'Raw Footage → Assembly → Rough Cut → Fine Cut → Final Export',
    timeline: '3-7 days',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRjZCNkIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkIxQjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5WaWRlbyBFZGl0aW5nPC90ZXh0Pjwvc3ZnPg=='
  },
  {
    id: 'color',
    title: 'Color Grading',
    icon: Palette,
    shortDesc: 'Cinematic color correction and mood enhancement',
    price: 'From $300',
    gradient: ['#4ECDC4', '#45B7B8', '#6C5CE7'],
    accentColor: '#4ECDC4',
    features: [
      'Color Correction',
      'Cinematic Grading',
      'LUT Creation',
      'Skin Tone Optimization',
      'Mood Enhancement'
    ],
    process: 'Analysis → Correction → Grading → LUT Application → Review',
    timeline: '2-4 days',
    tools: ['DaVinci Resolve', 'Adobe Premiere', 'FilmConvert'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0RUNDRDQ0Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM0NUI3QjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2QzVDRTciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNiKSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db2xvciBHcmFkaW5nPC90ZXh0Pjwvc3ZnPg=='
  },
  {
    id: 'vfx',
    title: 'Visual Effects',
    icon: Sparkles,
    shortDesc: 'Motion graphics and visual effects creation',
    price: 'From $800',
    gradient: ['#A8E6CF', '#7FCDCD', '#6A0572'],
    accentColor: '#A8E6CF',
    features: [
      'Compositing',
      'Motion Tracking',
      'Particle Effects',
      'Green Screen',
      '3D Integration'
    ],
    process: 'Pre-viz → Tracking → Compositing → Effects → Integration',
    timeline: '5-10 days',
    tools: ['After Effects', 'Nuke', 'Cinema 4D'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNBOEU2Q0YiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzdGQ0RDRCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZBMDU3MiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2MpIi8+PHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVmZmVjdHMgJmFtcDsgVkZYPC90ZXh0Pjwvc3ZnPg=='
  },
  {
    id: 'motion',
    title: 'Motion Graphics',
    icon: Layers,
    shortDesc: 'Animated graphics and typography',
    price: 'From $400',
    gradient: ['#FFD93D', '#FF9F43', '#FF6B35'],
    accentColor: '#FFD93D',
    features: [
      'Logo Animation',
      'Typography Animation',
      'Infographics',
      'Lower Thirds',
      'Brand Integration'
    ],
    process: 'Concept → Design → Animation → Sound → Export',
    timeline: '4-8 days',
    tools: ['After Effects', 'Cinema 4D', 'Illustrator'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQ5M0QiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0ZGOUY0MyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGNkIzNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2QpIi8+PHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vdGlvbiBHcmFwaGljczwvdGV4dD48L3N2Zz4='
  },
  {
    id: 'audio',
    title: 'Audio Post Production',
    icon: Volume2,
    shortDesc: 'Professional audio mixing and sound design',
    price: 'From $250',
    gradient: ['#9B59B6', '#8E44AD', '#6C3483'],
    accentColor: '#9B59B6',
    features: [
      'Audio Mixing',
      'Sound Design',
      'Noise Reduction',
      'Voice Enhancement',
      'Music Integration'
    ],
    process: 'Analysis → Cleaning → Mixing → Enhancement → Mastering',
    timeline: '2-5 days',
    tools: ['Pro Tools', 'Adobe Audition', 'Logic Pro'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImUiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM5QjU5QjYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzhFNDRBRCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZDMzQ4MyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2UpIi8+PHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkF1ZGlvIFBvc3Q8L3RleHQ+PC9zdmc+'
  },
  {
    id: 'consultation',
    title: 'Creative Consultation',
    icon: Monitor,
    shortDesc: 'Strategic planning and creative direction',
    price: 'From $150',
    gradient: ['#2ECC71', '#27AE60', '#1E8449'],
    accentColor: '#2ECC71',
    features: [
      'Creative Strategy',
      'Pre-production Planning',
      'Technical Consultation',
      'Workflow Optimization',
      'Project Management'
    ],
    process: 'Discovery → Strategy → Planning → Implementation → Review',
    timeline: '1-3 days',
    tools: ['Adobe Creative Suite', 'Frame.io', 'Notion'],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImYiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyRUNDNzEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzI3QUU2MCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFFODQ0OSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2YpIi8+PHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbnN1bHRhdGlvbjwvdGV4dD48L3N2Zz4='
  }
];

// Modern Service Card Component
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
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = service.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 60,
        rotationX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true
        }
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
    
    if (cardRef.current && imageRef.current && contentRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
    
    if (cardRef.current && imageRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer transform-gpu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Main Card */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${service.gradient[0]}15, ${service.gradient[1]}10, ${service.gradient[2]}05)`
            : 'rgba(255,255,255,0.05)',
          borderColor: isHovered ? service.accentColor + '40' : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered 
            ? `0 25px 50px ${service.accentColor}20, 0 0 0 1px ${service.accentColor}20`
            : '0 10px 30px rgba(0,0,0,0.3)'
        }}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <div 
            ref={imageRef}
            className="absolute inset-0 transition-transform duration-700"
          >
            <img 
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
          
          {/* Price Tag */}
          <div 
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
            style={{ 
              background: `${service.accentColor}20`,
              color: service.accentColor,
              border: `1px solid ${service.accentColor}40`
            }}
          >
            {service.price}
          </div>

          {/* Icon */}
          <div 
            className="absolute top-4 left-4 p-3 rounded-full backdrop-blur-sm"
            style={{ 
              background: `${service.accentColor}20`,
              border: `1px solid ${service.accentColor}40`
            }}
          >
            <IconComponent 
              className="w-6 h-6" 
              style={{ color: service.accentColor }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="p-6">
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{service.shortDesc}</p>
          </div>

          {/* Features Preview */}
          <div className="mb-4">
            <div className="space-y-1">
              {service.features.slice(0, 3).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ background: service.accentColor }}
                  />
                  <span className="text-white/80 text-xs">{feature}</span>
                </div>
              ))}
              {service.features.length > 3 && (
                <div className="text-white/50 text-xs">+{service.features.length - 3} more</div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-white/50" />
              <span className="text-white/50">{service.timeline}</span>
            </div>
            <div 
              className="flex items-center space-x-1 text-xs font-medium"
              style={{ color: service.accentColor }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${service.accentColor}10, transparent 70%)`
            }}
          />
        )}
      </div>
    </div>
  );
};

// Service Detail Modal
const ServiceModal = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: any; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const IconComponent = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-cinema-black/95 backdrop-blur-md border border-white/20"
      >
        {/* Header */}
        <div 
          className="relative p-8 border-b border-white/10"
          style={{ 
            background: `linear-gradient(135deg, ${service.gradient[0]}20, ${service.gradient[1]}10)`
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${service.accentColor}, ${service.gradient[1]})`
                }}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                <p className="text-white/70 text-lg">{service.shortDesc}</p>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2"
                  style={{ 
                    background: `${service.accentColor}20`,
                    color: service.accentColor
                  }}
                >
                  {service.price}
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Process */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Process</h3>
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    background: `${service.accentColor}10`,
                    borderColor: service.accentColor
                  }}
                >
                  <p className="text-white/80 text-sm">{service.process}</p>
                </div>
              </div>

              {/* Timeline & Tools */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Timeline</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" style={{ color: service.accentColor }} />
                    <span className="text-white/80">{service.timeline}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Tools</h4>
                  <div className="space-y-1">
                    {service.tools.map((tool: string, idx: number) => (
                      <div key={idx} className="text-white/70 text-sm">{tool}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
                <div className="space-y-3">
                  {service.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" style={{ color: service.accentColor }} />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button 
                  className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.accentColor}, ${service.gradient[1]})`
                  }}
                >
                  Get Started - {service.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-cinema-black via-gray-900 to-cinema-black py-20 relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-16 px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cinema-gold to-cinema-orange bg-clip-text text-transparent">Services</span> & Expertise
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Professional video production services tailored to bring your vision to life. 
            From concept to final delivery, I handle every aspect of post-production with precision and creativity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === service.id}
                onHover={() => setActiveService(service.id)}
                onLeave={() => setActiveService(null)}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Let's discuss your vision and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cinema-gold to-cinema-orange text-cinema-black font-semibold rounded-lg hover:shadow-[0_0_30px_#FFD93D50] transition-all duration-300 transform hover:scale-105">
                Get Free Consultation
              </button>
              <button className="px-8 py-4 border border-cinema-white/30 text-cinema-white font-semibold rounded-lg hover:bg-cinema-white/10 transition-all duration-300 transform hover:scale-105">
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </section>

      {/* Service Detail Modal */}
      <ServiceModal 
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
};

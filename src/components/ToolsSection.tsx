import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Monitor, 
  Palette, 
  Layers, 
  Film, 
  Volume2, 
  Cpu, 
  Zap,
  Star,
  X,
  Camera
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Tool data with skill levels and details
const tools = [
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    category: 'Video Editing',
    skillLevel: 95,
    experience: '8+ years',
    icon: Film,
    color: '#9999FF',
    gradient: ['#9999FF', '#7A7AFF', '#5A5AFF'],
    projects: ['Film trailers', 'Corporate videos', 'Music videos', 'Documentaries'],
    features: ['Advanced timeline editing', 'Multi-camera sequences', 'Proxy workflows', 'Color correction']
  },
  {
    id: 'aftereffects',
    name: 'After Effects',
    category: 'Motion Graphics & VFX',
    skillLevel: 90,
    experience: '7+ years',
    icon: Layers,
    color: '#9999FF',
    gradient: ['#9999FF', '#CC99FF', '#FF99CC'],
    projects: ['Logo animations', 'Title sequences', 'Visual effects', 'Compositing'],
    features: ['Complex compositing', 'Motion tracking', 'Expression scripting', 'Plugin development']
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'Color Grading',
    skillLevel: 85,
    experience: '5+ years',
    icon: Palette,
    color: '#FF6B6B',
    gradient: ['#FF6B6B', '#FF8E8E', '#FFB1B1'],
    projects: ['Feature films', 'Commercial grading', 'Music videos', 'Brand content'],
    features: ['Professional color grading', 'HDR workflows', 'Noise reduction', 'Advanced scopes']
  },
  {
    id: 'blender',
    name: 'Blender',
    category: '3D Animation',
    skillLevel: 80,
    experience: '4+ years',
    icon: Monitor,
    color: '#FF9500',
    gradient: ['#FF9500', '#FFB347', '#FFD194'],
    projects: ['3D product visualization', 'Motion graphics', 'Environment design', 'Character animation'],
    features: ['3D modeling', 'Animation', 'Cycles rendering', 'Geometry nodes']
  },
  {
    id: 'audition',
    name: 'Adobe Audition',
    category: 'Audio Post',
    skillLevel: 88,
    experience: '6+ years',
    icon: Volume2,
    color: '#00CFCF',
    gradient: ['#00CFCF', '#33D9D9', '#66E3E3'],
    projects: ['Podcast editing', 'Music mixing', 'Sound design', 'Audio restoration'],
    features: ['Spectral editing', 'Multi-track mixing', 'Noise reduction', 'Audio restoration']
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Graphics Design',
    skillLevel: 92,
    experience: '10+ years',
    icon: Camera,
    color: '#31A8FF',
    gradient: ['#31A8FF', '#5CBAFF', '#87CCFF'],
    projects: ['Poster design', 'Digital matte painting', 'Compositing', 'Retouching'],
    features: ['Advanced compositing', 'Digital painting', 'Photo manipulation', 'Texture creation']
  }
];

// Tool Card Component
const ToolCard = ({ 
  tool, 
  index, 
  isHovered, 
  onHover, 
  onLeave, 
  onClick 
}: {
  tool: any;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const IconComponent = tool.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Entrance animation
    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9 
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  useEffect(() => {
    const gear = gearRef.current;
    const sparks = sparksRef.current;
    
    if (isHovered && gear) {
      // Gear spinning animation
      gsap.to(gear, {
        rotation: 360,
        duration: 2,
        ease: "none",
        repeat: -1
      });

      // Card hover effect
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });

      // Electric sparks
      if (sparks) {
        gsap.fromTo(sparks.children, 
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }
        );
      }

    } else if (gear) {
      gsap.killTweensOf([gear, cardRef.current]);
      
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      if (sparks) {
        gsap.to(sparks.children, {
          scale: 0,
          opacity: 0,
          duration: 0.2
        });
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="relative w-64 h-72 cursor-pointer transform-gpu bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ 
        background: `linear-gradient(135deg, ${tool.color}15, transparent)`,
        boxShadow: isHovered ? `0 20px 40px ${tool.color}20` : '0 10px 30px rgba(0,0,0,0.3)'
      }}
    >
      {/* Electric Sparks */}
      <div ref={sparksRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-0"
            style={{
              background: tool.color,
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              boxShadow: `0 0 8px ${tool.color}`
            }}
          />
        ))}
      </div>

      {/* Gear Animation */}
      <div 
        ref={gearRef}
        className="absolute top-4 right-4 opacity-30"
      >
        <Zap className="w-6 h-6" style={{ color: tool.color }} />
      </div>

      {/* Tool Icon */}
      <div className="flex items-center justify-center mb-4">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${tool.color}, ${tool.gradient[1]})`,
            boxShadow: `0 8px 32px ${tool.color}40`
          }}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Tool Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-1">{tool.name}</h3>
        <p className="text-white/70 text-sm mb-3">{tool.category}</p>
        
        {/* Skill Level */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/80 text-xs">Skill Level</span>
            <span className="text-white font-bold text-xs">{tool.skillLevel}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-1000"
              style={{ 
                width: `${tool.skillLevel}%`,
                background: `linear-gradient(90deg, ${tool.color}, ${tool.gradient[1]})`
              }}
            />
          </div>
        </div>

        {/* Experience */}
        <div className="text-center">
          <div className="text-white/60 text-xs">Experience</div>
          <div className="text-white font-semibold text-sm">{tool.experience}</div>
        </div>
      </div>
    </div>
  );
};

// Tool Details Modal (simplified)
const ToolDetailsModal = ({ tool, isOpen, onClose }: { tool: any; isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative max-w-2xl w-full bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.gradient[1]})` }}
            >
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{tool.name}</h2>
              <p className="text-white/70 text-sm">{tool.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-2">Projects Used In</h3>
            <div className="grid grid-cols-2 gap-2">
              {tool.projects.map((project: string, idx: number) => (
                <div 
                  key={idx}
                  className="px-3 py-2 rounded-lg text-sm text-white/80 bg-white/10"
                >
                  {project}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-2">Key Features</h3>
            <div className="space-y-1">
              {tool.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Star className="w-3 h-3" style={{ color: tool.color }} />
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<any | null>(null);

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
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleToolClick = (tool: any) => {
    setSelectedTool(tool);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-cinema-black via-gray-900 to-cinema-black py-20 relative overflow-hidden"
      >
        {/* Section Header */}
        <div className="text-center mb-16 px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cinema-gold to-cinema-orange bg-clip-text text-transparent">Tools</span> & Stack
          </h2>
          <h3 className="text-2xl text-cinema-gold mb-4">My Arsenal</h3>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Professional tools mastered over years of experience. Each represents countless hours of learning and creating.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                isHovered={hoveredTool === tool.id}
                onHover={() => setHoveredTool(tool.id)}
                onLeave={() => setHoveredTool(null)}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </section>

      {/* Tool Details Modal */}
      <ToolDetailsModal 
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </>
  );
};

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

// Tool data
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
    color: '#CC99FF',
    gradient: ['#CC99FF', '#9999FF', '#FF99CC'],
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

// Simple Tool Card Component
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
  const IconComponent = tool.icon;

  // Simple entrance animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Simple fade-in animation
    gsap.set(card, { opacity: 0, y: 30 });
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out"
    });
  }, [index]);

  // Hover effects
  useEffect(() => {
    const gear = gearRef.current;
    
    if (isHovered && gear) {
      gsap.to(gear, {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1
      });

      gsap.to(cardRef.current, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (gear) {
      gsap.killTweensOf(gear);
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="relative w-72 h-80 cursor-pointer bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ 
        background: `linear-gradient(135deg, ${tool.color}15, transparent)`,
        borderColor: isHovered ? `${tool.color}60` : 'rgba(255,255,255,0.2)'
      }}
    >
      {/* Gear Animation */}
      <div 
        ref={gearRef}
        className="absolute top-4 right-4 opacity-30"
      >
        <Zap className="w-6 h-6" style={{ color: tool.color }} />
      </div>

      {/* Tool Icon */}
      <div className="flex items-center justify-center mb-6">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${tool.color}, ${tool.gradient[1]})`,
            boxShadow: `0 8px 32px ${tool.color}40`
          }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Tool Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
        <p className="text-white/70 text-sm mb-4">{tool.category}</p>
        
        {/* Skill Level */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Skill Level</span>
            <span className="text-white font-bold text-sm">{tool.skillLevel}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-1000"
              style={{ 
                width: `${tool.skillLevel}%`,
                background: `linear-gradient(90deg, ${tool.color}, ${tool.gradient[1]})`
              }}
            />
          </div>
        </div>

        {/* Experience */}
        <div className="text-center">
          <div className="text-white/60 text-sm">Experience</div>
          <div className="text-white font-semibold">{tool.experience}</div>
        </div>

        {/* Click hint */}
        <div className="mt-4 text-white/50 text-xs">
          Click to see details
        </div>
      </div>

      {/* Hover glow effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
          style={{ 
            boxShadow: `0 0 30px ${tool.color}`,
            background: `radial-gradient(circle at center, ${tool.color}20, transparent 70%)`
          }}
        />
      )}
    </div>
  );
};

// Tool Details Modal
const ToolDetailsModal = ({ tool, isOpen, onClose }: { tool: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.gradient[1]})` }}
            >
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{tool.name}</h2>
              <p className="text-white/70">{tool.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Skill & Experience */}
          <div>
            <h3 className="text-white font-semibold mb-3">Proficiency</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/80">Skill Level</span>
                  <span className="text-white font-bold">{tool.skillLevel}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${tool.skillLevel}%`,
                      background: `linear-gradient(90deg, ${tool.color}, ${tool.gradient[1]})`
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Experience</span>
                <span className="text-white font-semibold">{tool.experience}</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-3">Projects Used In</h3>
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
            <h3 className="text-white font-semibold mb-3">Key Features</h3>
            <div className="space-y-2">
              {tool.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Star className="w-4 h-4" style={{ color: tool.color }} />
                  <span className="text-white/80">{feature}</span>
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

        {/* Tools Grid - Now Always Visible */}
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

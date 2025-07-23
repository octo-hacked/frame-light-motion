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
  ArrowRight,
  Code,
  Camera,
  Maximize
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
    features: ['Advanced timeline editing', 'Multi-camera sequences', 'Proxy workflows', 'Color correction'],
    uiPreview: {
      type: 'timeline',
      description: 'Professional timeline with advanced trimming and effects'
    },
    sparkColor: '#9999FF'
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
    features: ['Complex compositing', 'Motion tracking', 'Expression scripting', 'Plugin development'],
    uiPreview: {
      type: 'composition',
      description: 'Layer-based compositing with keyframe animation'
    },
    sparkColor: '#CC99FF'
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
    features: ['Professional color grading', 'HDR workflows', 'Noise reduction', 'Advanced scopes'],
    uiPreview: {
      type: 'colorwheels',
      description: 'Professional color grading interface with advanced controls'
    },
    sparkColor: '#FF6B6B'
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
    features: ['3D modeling', 'Animation', 'Cycles rendering', 'Geometry nodes'],
    uiPreview: {
      type: '3dviewport',
      description: '3D viewport with modeling and animation tools'
    },
    sparkColor: '#FF9500'
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
    features: ['Spectral editing', 'Multi-track mixing', 'Noise reduction', 'Audio restoration'],
    uiPreview: {
      type: 'waveform',
      description: 'Advanced audio waveform editing with spectral display'
    },
    sparkColor: '#00CFCF'
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
    features: ['Advanced compositing', 'Digital painting', 'Photo manipulation', 'Texture creation'],
    uiPreview: {
      type: 'canvas',
      description: 'Digital canvas with advanced brush and layer tools'
    },
    sparkColor: '#31A8FF'
  },
  {
    id: 'cinema4d',
    name: 'Cinema 4D',
    category: '3D Motion Graphics',
    skillLevel: 83,
    experience: '5+ years',
    icon: Cpu,
    color: '#0066CC',
    gradient: ['#0066CC', '#3385D6', '#66A3E0'],
    projects: ['Motion graphics', 'Product visualization', 'Abstract animations', 'Broadcast graphics'],
    features: ['MoGraph tools', 'Advanced rendering', 'Simulation systems', 'Character animation'],
    uiPreview: {
      type: 'mograph',
      description: 'Motion graphics workflow with cloner and effector systems'
    },
    sparkColor: '#0066CC'
  },
  {
    id: 'nuke',
    name: 'Nuke',
    category: 'Professional Compositing',
    skillLevel: 75,
    experience: '3+ years',
    icon: Code,
    color: '#FFD700',
    gradient: ['#FFD700', '#FFE033', '#FFEB66'],
    projects: ['VFX compositing', 'Film post-production', 'Complex tracking', 'Green screen work'],
    features: ['Node-based compositing', 'Advanced keying', '3D tracking', 'Deep compositing'],
    uiPreview: {
      type: 'nodes',
      description: 'Node-based compositing workflow with advanced tools'
    },
    sparkColor: '#FFD700'
  }
];

// Tool Card Component with 3D effects
const ToolCard = ({ 
  tool, 
  index, 
  isHovered, 
  isActive, 
  onHover, 
  onLeave, 
  onClick 
}: {
  tool: any;
  index: number;
  isHovered: boolean;
  isActive: boolean;
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

    // Entrance animation with 3D rotation
    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 100,
        rotationY: -45,
        scale: 0.8 
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  useEffect(() => {
    const gear = gearRef.current;
    const sparks = sparksRef.current;
    
    if (isHovered && gear && sparks) {
      // Gear spinning animation
      gsap.to(gear, {
        rotation: 360,
        duration: 2,
        ease: "none",
        repeat: -1
      });

      // Electric sparks animation
      gsap.fromTo(sparks.children, 
        { 
          scale: 0,
          opacity: 0,
          rotation: 0
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 360,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out(1.7)",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5
        }
      );

      // Card 3D tilt
      gsap.to(cardRef.current, {
        rotationY: 8,
        rotationX: -5,
        y: -10,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center center"
      });

      // Glow effect
      gsap.to(cardRef.current, {
        boxShadow: `0 20px 40px ${tool.color}40, 0 0 60px ${tool.color}20`,
        duration: 0.4,
        ease: "power2.out"
      });

    } else if (gear && sparks) {
      gsap.killTweensOf([gear, sparks.children, cardRef.current]);
      
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isHovered, tool.color]);

  return (
    <div className="relative">
      {/* Tool Card */}
      <div
        ref={cardRef}
        className="relative w-72 h-80 cursor-pointer perspective-1000 transform-gpu"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        style={{ 
          transformStyle: 'preserve-3d',
          background: `linear-gradient(135deg, ${tool.gradient[0]}15, ${tool.gradient[1]}10, ${tool.gradient[2]}05)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${tool.color}30`,
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}
      >
        {/* Electric Sparks */}
        <div ref={sparksRef} className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-0"
              style={{
                background: tool.sparkColor,
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                boxShadow: `0 0 10px ${tool.sparkColor}`
              }}
            />
          ))}
        </div>

        {/* Gear Animation */}
        <div 
          ref={gearRef}
          className="absolute top-4 right-4 opacity-20"
        >
          <Zap className="w-8 h-8" style={{ color: tool.color }} />
        </div>

        {/* Tool Icon & Info */}
        <div className="p-6 h-full flex flex-col">
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
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

          {/* Tool Name */}
          <h3 className="text-xl font-bold text-center text-white mb-2">
            {tool.name}
          </h3>
          
          {/* Category */}
          <p className="text-center text-white/70 text-sm mb-4">
            {tool.category}
          </p>

          {/* Skill Level */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm">Skill Level</span>
              <span className="text-white font-bold">{tool.skillLevel}%</span>
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
            <div className="text-white/60 text-xs">Experience</div>
            <div className="text-white font-semibold">{tool.experience}</div>
          </div>

          {/* UI Preview Hint */}
          {isHovered && (
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/50 rounded-lg p-2 backdrop-blur-sm">
                <div className="text-xs text-white/80">Click to see UI preview</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tool Details Modal
const ToolDetailsModal = ({ tool, isOpen, onClose }: { tool: any; isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const uiPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${tool.gradient[0]}20, ${tool.gradient[1]}15, ${tool.gradient[2]}10)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${tool.color}30`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.gradient[1]})` }}
            >
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
              <p className="text-white/70">{tool.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Details */}
            <div className="space-y-6">
              {/* Skill & Experience */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Proficiency</h3>
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
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Experience</span>
                    <span className="text-white font-semibold">{tool.experience}</span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Projects Used In</h3>
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

              {/* Favorite Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Favorite Features</h3>
                <div className="space-y-2">
                  {tool.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Star className="w-4 h-4" style={{ color: tool.color }} />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - UI Preview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Interface Preview</h3>
              <div 
                ref={uiPreviewRef}
                className="aspect-video rounded-lg overflow-hidden border border-white/20"
                style={{
                  background: `linear-gradient(135deg, ${tool.gradient[0]}30, ${tool.gradient[1]}20)`
                }}
              >
                {/* Mock UI Preview */}
                <div className="w-full h-full p-4 relative">
                  <div className="text-white/60 text-xs mb-2">{tool.uiPreview.description}</div>
                  
                  {/* Different UI previews based on tool type */}
                  {tool.uiPreview.type === 'timeline' && (
                    <div className="space-y-2">
                      <div className="h-8 bg-white/10 rounded flex items-center px-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <div className="text-xs text-white/60">Video Track 1</div>
                      </div>
                      <div className="h-6 bg-blue-500/30 rounded"></div>
                      <div className="h-6 bg-green-500/30 rounded w-3/4"></div>
                    </div>
                  )}
                  
                  {tool.uiPreview.type === 'colorwheels' && (
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-full border border-white/20 relative">
                          <div 
                            className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{ background: tool.color }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {tool.uiPreview.type === '3dviewport' && (
                    <div className="relative h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded">
                      <div className="absolute inset-4 border border-white/20 rounded"></div>
                      <div className="absolute top-6 left-6 w-8 h-8 border border-yellow-400 rounded"></div>
                    </div>
                  )}
                  
                  {(tool.uiPreview.type === 'waveform' || tool.uiPreview.type === 'composition' || tool.uiPreview.type === 'nodes') && (
                    <div className="space-y-1">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i}
                          className="h-2 rounded"
                          style={{ 
                            background: `${tool.color}30`,
                            width: `${30 + Math.random() * 70}%`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
        ease: "power3.out",
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
        <div className="text-center mb-20 px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-cinema-white mb-6">
            <span className="bg-gradient-cinematic bg-clip-text text-transparent">Tools</span> & Stack
          </h2>
          <h3 className="text-2xl text-cinema-gold mb-4">My Arsenal</h3>
          <p className="text-xl text-cinema-white/70 max-w-3xl mx-auto leading-relaxed">
            A curated collection of professional tools I've mastered over years of experience. 
            Each tool represents countless hours of learning, creating, and pushing creative boundaries.
          </p>
        </div>

        {/* 3D Tool Belt Grid */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                isHovered={hoveredTool === tool.id}
                isActive={selectedTool?.id === tool.id}
                onHover={() => setHoveredTool(tool.id)}
                onLeave={() => setHoveredTool(null)}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        </div>

        {/* Studio Environment Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20">
            <Monitor className="w-16 h-16 text-cinema-gold animate-pulse" />
          </div>
          <div className="absolute top-40 right-32">
            <Camera className="w-12 h-12 text-cinema-orange animate-float" />
          </div>
          <div className="absolute bottom-32 left-32">
            <Cpu className="w-14 h-14 text-cinema-blue animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="absolute bottom-20 right-20">
            <Maximize className="w-10 h-10 text-cinema-white animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Ambient Lighting */}
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

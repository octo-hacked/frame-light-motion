import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  Award, 
  Users, 
  Zap, 
  Camera, 
  Film, 
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Journey milestones data
const milestones = [
  {
    id: 'passion',
    year: '2018',
    title: 'The Spark',
    subtitle: 'From Passion to Purpose',
    description: 'Discovered the magic of storytelling through video editing. Started with simple projects, driven by pure passion for visual narrative.',
    icon: Zap,
    color: '#FF6B6B',
    backgroundYear: '2018',
    achievements: [
      'First video edit project',
      'Learned basic editing principles',
      'Discovered passion for storytelling'
    ],
    stats: {
      projects: '5+',
      tools: '2',
      experience: 'Beginner'
    },
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZpcnN0IEVkaXQgUHJvamVjdDwvdGV4dD48L3N2Zz4=',
    quote: '"Every expert was once a beginner."'
  },
  {
    id: 'growth',
    year: '2020',
    title: 'Professional Leap',
    subtitle: 'Building the Foundation',
    description: 'Transitioned into professional work, collaborating with local businesses and content creators. Mastered fundamental editing techniques.',
    icon: TrendingUp,
    color: '#4ECDC4',
    backgroundYear: '2020',
    achievements: [
      'First commercial project',
      'Client collaboration skills',
      'Advanced technique mastery'
    ],
    stats: {
      projects: '50+',
      tools: '5',
      experience: 'Intermediate'
    },
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzJkM2E4YyIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbW1lcmNpYWwgV29yazwvdGV4dD48L3N2Zz4=',
    quote: '"Growth begins at the end of your comfort zone."'
  },
  {
    id: 'mastery',
    year: '2022',
    title: 'Cinematic Evolution',
    subtitle: 'Defining the Style',
    description: 'Developed signature cinematic style, specializing in color grading and advanced post-production. Started working on larger projects.',
    icon: Film,
    color: '#FFD93D',
    backgroundYear: '2022',
    achievements: [
      'Signature style development',
      'Color grading specialization',
      'Large-scale project management'
    ],
    stats: {
      projects: '150+',
      tools: '8',
      experience: 'Advanced'
    },
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzY2MjFhYSIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNpbmVtYXRpYyBNYXN0ZXJ5PC90ZXh0Pjwvc3ZnPg==',
    quote: '"Style is knowing who you are and what you want to say."'
  },
  {
    id: 'excellence',
    year: '2024',
    title: 'Creative Excellence',
    subtitle: 'Pushing Boundaries',
    description: 'Established as a go-to professional for high-end video production. Continuously innovating and pushing creative boundaries.',
    icon: Award,
    color: '#FF9F43',
    backgroundYear: '2024',
    achievements: [
      'Industry recognition',
      'Premium client portfolio',
      'Innovation leadership'
    ],
    stats: {
      projects: '300+',
      tools: '12',
      experience: 'Expert'
    },
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzFhMTAyZSIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV4Y2VsbGVuY2UgQWNoaWV2ZWQ8L3RleHQ+PC9zdmc+',
    quote: '"Excellence is never an accident."'
  }
];

// Film Frame Component
const FilmFrame = ({ 
  milestone, 
  index, 
  isActive, 
  isVisible, 
  onClick 
}: {
  milestone: any;
  index: number;
  isActive: boolean;
  isVisible: boolean;
  onClick: () => void;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const IconComponent = milestone.icon;

  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame || !content) return;

    if (isVisible) {
      // Frame entrance animation
      gsap.fromTo(frame,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -100 : 100,
          rotationY: index % 2 === 0 ? -15 : 15
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(content.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2 + 0.3,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Active frame highlighting
    if (isActive) {
      gsap.to(frame, {
        scale: 1.05,
        boxShadow: `0 20px 60px ${milestone.color}40`,
        borderColor: milestone.color,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(frame, {
        scale: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.1)",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isVisible, isActive, index, milestone.color]);

  return (
    <div className="relative mb-20">
      {/* Film perforations */}
      <div className="absolute -left-8 top-0 bottom-0 w-4 flex flex-col justify-between">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-cinema-white/20 rounded-sm"
          />
        ))}
      </div>
      <div className="absolute -right-8 top-0 bottom-0 w-4 flex flex-col justify-between">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-cinema-white/20 rounded-sm"
          />
        ))}
      </div>

      {/* Film Frame */}
      <div
        ref={frameRef}
        className={`relative w-full max-w-2xl mx-auto bg-cinema-black border-2 rounded-lg overflow-hidden cursor-pointer transform-gpu ${
          index % 2 === 0 ? 'ml-0' : 'ml-auto'
        }`}
        onClick={onClick}
        style={{ 
          borderColor: isActive ? milestone.color : 'rgba(255,255,255,0.1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Frame header with year */}
        <div 
          className="p-4 border-b border-white/10"
          style={{ background: `linear-gradient(135deg, ${milestone.color}20, transparent)` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: milestone.color }}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{milestone.year}</div>
                <div className="text-sm text-white/70">Frame #{index + 1}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-white">{milestone.title}</div>
              <div className="text-sm text-white/60">{milestone.subtitle}</div>
            </div>
          </div>
        </div>

        {/* Frame content */}
        <div ref={contentRef} className="p-6">
          {/* Image placeholder */}
          <div className="relative mb-4 rounded-lg overflow-hidden">
            <img 
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Description */}
          <p className="text-white/80 mb-4 leading-relaxed">
            {milestone.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: milestone.color }}>
                {milestone.stats.projects}
              </div>
              <div className="text-xs text-white/60">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: milestone.color }}>
                {milestone.stats.tools}
              </div>
              <div className="text-xs text-white/60">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: milestone.color }}>
                {milestone.stats.experience}
              </div>
              <div className="text-xs text-white/60">Level</div>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-white/70 italic text-sm">{milestone.quote}</p>
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div 
            className="absolute top-2 right-2 w-3 h-3 rounded-full animate-pulse"
            style={{ background: milestone.color }}
          />
        )}
      </div>
    </div>
  );
};

// Milestone Detail Modal
const MilestoneModal = ({ 
  milestone, 
  isOpen, 
  onClose 
}: { 
  milestone: any; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  if (!isOpen || !milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-cinema-black border border-white/20"
      >
        {/* Header */}
        <div 
          className="p-6 border-b border-white/10"
          style={{ background: `linear-gradient(135deg, ${milestone.color}20, transparent)` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: milestone.color }}
              >
                <milestone.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{milestone.year}</h2>
                <h3 className="text-xl text-white/80">{milestone.title}</h3>
                <p className="text-white/60">{milestone.subtitle}</p>
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
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">The Story</h4>
                <p className="text-white/80 leading-relaxed">{milestone.description}</p>
              </div>

              {/* Stats */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">By the Numbers</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: milestone.color }}>
                      {milestone.stats.projects}
                    </div>
                    <div className="text-sm text-white/60">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: milestone.color }}>
                      {milestone.stats.tools}
                    </div>
                    <div className="text-sm text-white/60">Tools Mastered</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: milestone.color }}>
                      {milestone.stats.experience}
                    </div>
                    <div className="text-sm text-white/60">Skill Level</div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 bg-white/5 rounded-lg border-l-4" style={{ borderColor: milestone.color }}>
                <p className="text-white/80 italic text-lg">{milestone.quote}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                <div className="space-y-3">
                  {milestone.achievements.map((achievement: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Star className="w-4 h-4" style={{ color: milestone.color }} />
                      <span className="text-white/80">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Visual Memory</h4>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-semibold">{milestone.title}</div>
                    <div className="text-white/70 text-sm">{milestone.year}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState<number>(0);
  const [selectedMilestone, setSelectedMilestone] = useState<any | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    if (!section || !background) return;

    // Parallax background effect based on scroll
    gsap.to(background, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Dynamic background year change
    const yearElements = section.querySelectorAll('[data-year]');
    yearElements.forEach((element, index) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveFrame(index),
        onEnterBack: () => setActiveFrame(index)
      });
    });

  }, []);

  // Dynamic background based on active frame
  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const activeMilestone = milestones[activeFrame];
    if (activeMilestone) {
      gsap.to(background, {
        background: `radial-gradient(circle at 50% 50%, ${activeMilestone.color}15, transparent 70%)`,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, [activeFrame]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-cinema-black via-gray-900 to-cinema-black py-20 overflow-hidden"
      >
        {/* Dynamic background */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 transition-all duration-1000"
        />

        {/* Large background year */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div 
            className="text-[20rem] font-black text-white/5 select-none"
            style={{ 
              transform: 'translateY(-10%)',
              textShadow: '0 0 100px rgba(255,255,255,0.1)'
            }}
          >
            {milestones[activeFrame]?.backgroundYear || '2024'}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cinema-gold to-cinema-orange bg-clip-text text-transparent">Journey</span> Timeline
          </h2>
          <h3 className="text-2xl text-cinema-gold mb-4">From Passion to Profession</h3>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Follow my evolution from passionate beginner to professional video editor. 
            Each frame tells a story of growth, learning, and creative discovery.
          </p>
        </div>

        {/* Film Strip Timeline */}
        <div ref={filmStripRef} className="relative max-w-4xl mx-auto px-6">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cinema-gold via-cinema-orange to-cinema-gold transform -translate-x-1/2" />
          
          {/* Film frames */}
          {milestones.map((milestone, index) => (
            <div key={milestone.id} data-year={milestone.year}>
              <FilmFrame
                milestone={milestone}
                index={index}
                isActive={activeFrame === index}
                isVisible={true}
                onClick={() => setSelectedMilestone(milestone)}
              />
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 opacity-20">
          <Camera className="w-16 h-16 text-cinema-gold animate-float" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <Film className="w-12 h-12 text-cinema-orange animate-pulse" />
        </div>

        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </section>

      {/* Milestone Detail Modal */}
      <MilestoneModal 
        milestone={selectedMilestone}
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </>
  );
};

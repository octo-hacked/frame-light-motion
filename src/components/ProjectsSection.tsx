import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Play, Pause, Quote, Clock, User, Award, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Project data
const projects = [
  {
    id: 1,
    title: "Nike Air Revolution",
    category: "Commercial",
    client: "Nike",
    duration: "30s",
    year: "2024",
    thumbnail: "/api/placeholder/400/300",
    description: "High-energy commercial showcasing the latest Nike Air technology with dynamic cuts and rhythm.",
    challenge: "Create excitement around new product launch while maintaining brand consistency.",
    solution: "Used rapid cutting synchronized with beats, dynamic camera movements, and color grading that emphasizes the orange brand accent.",
    shots: [
      { id: 1, time: "0:00", title: "Opening Logo", description: "Brand establishment with kinetic typography" },
      { id: 2, time: "0:03", title: "Product Hero", description: "Dramatic reveal of the shoe with lighting effects" },
      { id: 3, time: "0:08", title: "Action Sequence", description: "Athlete in motion with slow-motion details" },
      { id: 4, time: "0:15", title: "Technology Focus", description: "Close-up of Air technology with graphics" },
      { id: 5, time: "0:22", title: "Brand Call-to-Action", description: "Final logo treatment with tagline" }
    ],
    testimonial: {
      quote: "The editing brought our vision to life with incredible energy. The pacing and rhythm perfectly captured the essence of our brand.",
      author: "Sarah Johnson",
      position: "Creative Director, Nike"
    },
    beforeAfter: {
      before: "Raw footage lacked cohesion and energy",
      after: "Dynamic, branded commercial ready for global launch"
    }
  },
  {
    id: 2,
    title: "Midnight Chronicles",
    category: "Short Film",
    client: "Independent",
    duration: "12:30",
    year: "2024",
    thumbnail: "/api/placeholder/300/400",
    description: "Atmospheric thriller exploring themes of isolation and redemption through careful pacing and color psychology.",
    challenge: "Balance suspense with character development in limited runtime.",
    solution: "Strategic use of silence, shadow play, and progressive color temperature shifts to build tension.",
    shots: [
      { id: 1, time: "0:00", title: "Establishing Shot", description: "Urban landscape at night setting the mood" },
      { id: 2, time: "1:30", title: "Character Introduction", description: "Protagonist revealed through shadows" },
      { id: 3, time: "4:45", title: "Conflict Rising", description: "Tension builds through quick cuts" },
      { id: 4, time: "8:20", title: "Climax", description: "Emotional peak with tight close-ups" },
      { id: 5, time: "11:15", title: "Resolution", description: "Color shift to warmer tones for closure" }
    ],
    testimonial: {
      quote: "The editorial choices transformed our raw footage into a compelling narrative. Every cut serves the story.",
      author: "Marcus Chen",
      position: "Director"
    },
    beforeAfter: {
      before: "Disconnected scenes lacking emotional flow",
      after: "Cohesive thriller with perfect pacing"
    }
  },
  {
    id: 3,
    title: "Spotify Sessions",
    category: "Music Video",
    client: "Spotify",
    duration: "3:45",
    year: "2024",
    thumbnail: "/api/placeholder/350/280",
    description: "Intimate acoustic session highlighting the raw emotion of the performance through minimalist editing.",
    challenge: "Capture authentic moments while maintaining visual interest.",
    solution: "Mixed static and handheld cameras with color grading that enhances the warm, acoustic atmosphere.",
    shots: [
      { id: 1, time: "0:00", title: "Studio Setup", description: "Wide shot establishing intimate space" },
      { id: 2, time: "0:20", title: "Artist Close-up", description: "Emotional connection through facial expressions" },
      { id: 3, time: "1:15", title: "Instrument Details", description: "Macro shots of guitar strings and fingers" },
      { id: 4, time: "2:30", title: "Wide Performance", description: "Full performance with natural lighting" },
      { id: 5, time: "3:20", title: "Closing Moment", description: "Fade to black with lingering audio" }
    ],
    testimonial: {
      quote: "You captured the soul of the performance. The editing feels invisible yet powerful.",
      author: "Alex Rivera",
      position: "Artist Relations, Spotify"
    },
    beforeAfter: {
      before: "Multi-camera footage needing cohesion",
      after: "Intimate, professional session video"
    }
  },
  {
    id: 4,
    title: "Tech Startup Launch",
    category: "Corporate",
    client: "InnovateCorp",
    duration: "2:15",
    year: "2024",
    thumbnail: "/api/placeholder/320/350",
    description: "Clean, modern corporate video explaining complex technology through clear visual storytelling.",
    challenge: "Make technical concepts accessible and engaging.",
    solution: "Used animated graphics, smooth transitions, and a progression from problem to solution.",
    shots: [
      { id: 1, time: "0:00", title: "Problem Statement", description: "Visual metaphors for current challenges" },
      { id: 2, time: "0:30", title: "Solution Introduction", description: "Clean product reveal with motion graphics" },
      { id: 3, time: "1:00", title: "Feature Breakdown", description: "Animated explanations of key features" },
      { id: 4, time: "1:45", title: "Results", description: "Success metrics with dynamic charts" },
      { id: 5, time: "2:05", title: "Call to Action", description: "Professional closing with contact info" }
    ],
    testimonial: {
      quote: "Professional, clean, and exactly what we needed for our investor presentation. Exceeded expectations.",
      author: "David Park",
      position: "CEO, InnovateCorp"
    },
    beforeAfter: {
      before: "Complex technical footage needing clarity",
      after: "Clear, engaging corporate presentation"
    }
  },
  {
    id: 5,
    title: "Food Network Special",
    category: "Documentary",
    client: "Food Network",
    duration: "8:20",
    year: "2024",
    thumbnail: "/api/placeholder/380/300",
    description: "Culinary documentary segment focusing on traditional cooking methods with rich visual storytelling.",
    challenge: "Balance educational content with entertainment value.",
    solution: "Close-up food cinematography with cultural context and personal storytelling.",
    shots: [
      { id: 1, time: "0:00", title: "Cultural Context", description: "Establishing shots of local environment" },
      { id: 2, time: "1:30", title: "Chef Introduction", description: "Personal story through interview style" },
      { id: 3, time: "3:00", title: "Cooking Process", description: "Detailed food preparation sequences" },
      { id: 4, time: "6:45", title: "Final Dish", description: "Beautiful presentation shots" },
      { id: 5, time: "7:50", title: "Cultural Impact", description: "Closing thoughts on tradition" }
    ],
    testimonial: {
      quote: "The editing perfectly balanced the technical aspects with the human story. Beautiful work.",
      author: "Jennifer Walsh",
      position: "Producer, Food Network"
    },
    beforeAfter: {
      before: "Long-form footage needing structure",
      after: "Engaging documentary segment"
    }
  },
  {
    id: 6,
    title: "Gaming Tournament Highlight",
    category: "Sports/Gaming",
    client: "ESL Gaming",
    duration: "4:30",
    year: "2024",
    thumbnail: "/api/placeholder/300/320",
    description: "High-energy tournament recap capturing the excitement and skill of competitive gaming.",
    challenge: "Convey the intensity and strategy of esports to broader audience.",
    solution: "Mixed gameplay footage with crowd reactions and strategic graphics overlay.",
    shots: [
      { id: 1, time: "0:00", title: "Tournament Opening", description: "Arena atmosphere with crowd energy" },
      { id: 2, time: "0:45", title: "Key Plays", description: "Gameplay highlights with slow-motion replays" },
      { id: 3, time: "2:30", title: "Player Reactions", description: "Emotional moments and celebrations" },
      { id: 4, time: "3:45", title: "Final Moments", description: "Championship-deciding plays" },
      { id: 5, time: "4:15", title: "Victory", description: "Winner celebration and closing" }
    ],
    testimonial: {
      quote: "Captured the essence of competitive gaming perfectly. The pacing kept viewers engaged throughout.",
      author: "Michael Torres",
      position: "Content Director, ESL"
    },
    beforeAfter: {
      before: "Hours of tournament footage to condense",
      after: "Exciting 4-minute highlight reel"
    }
  }
];

// VHS Scanline Mouse Trail Component
const VHSScanline = () => {
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={scanlineRef}
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: mousePos.x - 100,
        top: mousePos.y - 2,
        width: '200px',
        height: '4px',
        background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
        opacity: 0.6,
        filter: 'blur(1px)',
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

// Adobe Premiere-style Timeline Component
const PremiereTimeline = ({ shots, currentTime, onTimeChange }: {
  shots: any[];
  currentTime: number;
  onTimeChange: (time: number) => void;
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const parseTime = (timeStr: string) => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4 z-40">
      <div className="max-w-6xl mx-auto">
        {/* Timeline Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="text-white font-mono text-sm">
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="text-white text-sm">
            Adobe Premiere Pro Style Timeline
          </div>
        </div>

        {/* Timeline Track */}
        <div className="relative bg-gray-800 rounded h-16 overflow-hidden">
          {/* Time ruler */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gray-700 border-b border-gray-600">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full border-l border-gray-500"
                style={{ left: `${(i / 5) * 100}%` }}
              >
                <span className="text-xs text-gray-300 ml-1">{formatTime(i * 30)}</span>
              </div>
            ))}
          </div>

          {/* Shot blocks */}
          <div className="absolute top-4 left-0 right-0 bottom-0">
            {shots.map((shot, index) => {
              const startTime = parseTime(shot.time);
              const duration = index < shots.length - 1 
                ? parseTime(shots[index + 1].time) - startTime 
                : 30;
              const leftPercent = (startTime / 150) * 100;
              const widthPercent = (duration / 150) * 100;

              return (
                <div
                  key={shot.id}
                  className="absolute top-0 h-full bg-blue-500 border border-blue-400 rounded cursor-pointer hover:bg-blue-400 transition-colors"
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`
                  }}
                  onClick={() => onTimeChange(startTime)}
                >
                  <div className="p-1 text-xs text-white truncate">
                    {shot.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${(currentTime / 150) * 100}%` }}
          >
            <div className="absolute -top-1 -left-2 w-4 h-6 bg-red-500 clip-path-triangle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Detail Modal Component
const ProjectModal = ({ project, isOpen, onClose }: {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'shots' | 'process'>('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 bg-gray-900 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="text-gray-400">{project.client} • {project.duration} • {project.year}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'shots', label: 'Shot Breakdown' },
              { id: 'process', label: 'Process' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-cinema-gold text-cinema-gold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-8">
              {/* Video Player Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl text-gray-600 mb-4">🎬</div>
                  <h3 className="text-xl text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400">Video Player Placeholder</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Client:</span>
                      <span className="text-white">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Year:</span>
                      <span className="text-white">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{project.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>
              </div>

              {/* Before/After */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Before / After</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold mb-2">Before</h4>
                    <p className="text-gray-300">{project.beforeAfter.before}</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">After</h4>
                    <p className="text-gray-300">{project.beforeAfter.after}</p>
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-cinema-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-300 text-lg italic mb-4">"{project.testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white font-semibold">{project.testimonial.author}</p>
                        <p className="text-gray-400 text-sm">{project.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shots' && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Shot Breakdown</h3>
              <div className="space-y-4">
                {project.shots.map((shot: any, index: number) => (
                  <div
                    key={shot.id}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => setCurrentTime(index * 30)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-cinema-gold" />
                        <span className="text-cinema-gold font-mono">{shot.time}</span>
                        <span className="text-white font-semibold">{shot.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-gray-300 text-sm ml-7">{shot.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Creative Challenge</h3>
                <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Editing Process Snapshots</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl text-gray-500 mb-2">📊</div>
                        <p className="text-gray-400 text-sm">Process Step {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Premiere Timeline */}
        <PremiereTimeline
          shots={project.shots}
          currentTime={currentTime}
          onTimeChange={setCurrentTime}
        />
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20 flex items-center justify-center relative overflow-hidden">
        <div className="text-6xl text-cinema-gold opacity-60">🎬</div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-cinema-gold text-cinema-black text-xs font-semibold rounded-full">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cinema-gold transition-colors">
            {project.title}
          </h3>
          <span className="text-gray-400 text-sm">{project.duration}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">{project.client}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-cinema-gold" />
            <span className="text-cinema-gold text-sm">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <VHSScanline />
      
      <section
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-cinema-black to-gray-900 py-20 relative overflow-hidden"
      >
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-cinema-white mb-6">
            <span className="bg-gradient-cinematic bg-clip-text text-transparent">Deep Dive</span> Case Studies
          </h2>
          <p className="text-xl text-cinema-white/70 max-w-3xl mx-auto leading-relaxed">
            Explore the creative process behind each project. From initial challenge to final delivery, 
            see how strategic editing decisions bring stories to life.
          </p>
        </div>

        {/* Projects Grid - Masonry Layout */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`${
                  project.id % 3 === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  project.id % 4 === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

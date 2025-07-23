import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Video categories data
const videoCategories = [
  {
    id: 'commercials',
    name: 'Commercials',
    color: '#D4AF37',
    videos: [
      { id: 1, title: 'Brand Campaign 2024', duration: '0:45', thumbnail: '/api/placeholder/400/225' },
      { id: 2, title: 'Product Launch', duration: '1:20', thumbnail: '/api/placeholder/400/225' },
      { id: 3, title: 'Corporate Story', duration: '2:15', thumbnail: '/api/placeholder/400/225' },
      { id: 4, title: 'Tech Showcase', duration: '1:05', thumbnail: '/api/placeholder/400/225' }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    videos: [
      { id: 5, title: 'Creator Collab', duration: '8:32', thumbnail: '/api/placeholder/400/225' },
      { id: 6, title: 'Tutorial Series', duration: '12:45', thumbnail: '/api/placeholder/400/225' },
      { id: 7, title: 'Vlog Edit', duration: '6:20', thumbnail: '/api/placeholder/400/225' },
      { id: 8, title: 'Review Video', duration: '9:15', thumbnail: '/api/placeholder/400/225' }
    ]
  },
  {
    id: 'music',
    name: 'Music Videos',
    color: '#9D4EDD',
    videos: [
      { id: 9, title: 'Indie Rock Anthem', duration: '3:42', thumbnail: '/api/placeholder/400/225' },
      { id: 10, title: 'Electronic Dreams', duration: '4:18', thumbnail: '/api/placeholder/400/225' },
      { id: 11, title: 'Acoustic Sessions', duration: '3:55', thumbnail: '/api/placeholder/400/225' },
      { id: 12, title: 'Hip Hop Visual', duration: '3:28', thumbnail: '/api/placeholder/400/225' }
    ]
  },
  {
    id: 'films',
    name: 'Short Films',
    color: '#06D6A0',
    videos: [
      { id: 13, title: 'Midnight Runner', duration: '15:30', thumbnail: '/api/placeholder/400/225' },
      { id: 14, title: 'The Last Frame', duration: '8:45', thumbnail: '/api/placeholder/400/225' },
      { id: 15, title: 'Urban Stories', duration: '12:20', thumbnail: '/api/placeholder/400/225' },
      { id: 16, title: 'Silent Moments', duration: '6:35', thumbnail: '/api/placeholder/400/225' }
    ]
  }
];

// 2D Animated Film Camera Component
const VintageCamera = ({ activeCategory }: { activeCategory: string }) => {
  const [isRecording, setIsRecording] = useState(false);
  const currentCategory = videoCategories.find(cat => cat.id === activeCategory);
  const accentColor = currentCategory?.color || '#D4AF37';

  useEffect(() => {
    const recordingInterval = setInterval(() => {
      setIsRecording(prev => !prev);
    }, 2000);

    return () => clearInterval(recordingInterval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full">
      {/* Film Camera Body */}
      <div className="relative transform animate-float">
        {/* Camera Base */}
        <div className="w-40 h-28 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl relative border-2"
             style={{ borderColor: accentColor }}>
          {/* Camera Details */}
          <div className="absolute top-3 left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Lens */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 flex items-center justify-center"
               style={{ borderColor: accentColor }}>
            <div className="w-16 h-16 bg-gradient-radial from-gray-900 via-gray-800 to-black rounded-full flex items-center justify-center shadow-inner">
              <div className="w-10 h-10 bg-gradient-radial from-gray-800 to-gray-900 rounded-full relative overflow-hidden">
                {/* Lens reflection */}
                <div className="absolute top-1 left-1 w-3 h-3 bg-white opacity-40 rounded-full"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-white opacity-20 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Recording Light */}
          <div className={`absolute top-2 right-3 w-4 h-4 rounded-full transition-all duration-300 ${
            isRecording ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' : 'bg-red-800'
          }`}></div>
          
          {/* Camera Brand */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold tracking-wider"
               style={{ color: accentColor }}>
            CINEMA
          </div>
          
          {/* Control Dials */}
          <div className="absolute top-2 right-12 w-3 h-3 rounded-full border-2 border-gray-600"></div>
          <div className="absolute bottom-6 right-3 w-4 h-2 bg-gray-700 rounded"></div>
        </div>
        
        {/* Film Strip */}
        <div className="absolute -top-8 -right-10 w-24 h-6 bg-gray-800 rounded transform rotate-12 shadow-lg">
          <div className="flex h-full">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex-1 border-l border-gray-600 first:border-l-0">
                <div className="w-full h-3 bg-gradient-to-r from-gray-700 to-gray-600 mb-1"></div>
                <div className="w-full h-1 bg-gray-700"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating Film Frames */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-10 h-8 bg-gray-800 border border-gray-600 rounded transform animate-float shadow-lg"
            style={{
              top: `${-15 + i * 10}px`,
              left: `${-25 + i * 18}px`,
              rotate: `${-20 + i * 12}deg`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '5s'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
              <div className="text-sm" style={{ color: accentColor }}>
                {i === 0 && '🎬'}
                {i === 1 && '🎥'}
                {i === 2 && '📽️'}
                {i === 3 && '🎞️'}
              </div>
            </div>
          </div>
        ))}
        
        {/* Tripod legs */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-8 bg-gray-700 relative">
            <div className="absolute bottom-0 -left-3 w-8 h-1 bg-gray-700 transform rotate-45 origin-right"></div>
            <div className="absolute bottom-0 -right-3 w-8 h-1 bg-gray-700 transform -rotate-45 origin-left"></div>
          </div>
        </div>
      </div>
      
      {/* Light Beam Effect */}
      <div className="absolute left-full ml-6 w-40 h-2 bg-gradient-to-r from-yellow-400 to-transparent opacity-60 animate-pulse"
           style={{ backgroundColor: accentColor, filter: 'blur(1px)' }}></div>
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-float opacity-70"
          style={{
            backgroundColor: accentColor,
            top: `${20 + i * 15}%`,
            right: `${10 + i * 8}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: '6s'
          }}
        ></div>
      ))}
    </div>
  );
};

// Speech Bubble Component
const SpeechBubble = ({ activeCategory }: { activeCategory: string }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "🎬 Welcome to my showreel!",
    "✨ Check out my editing work",
    "🎨 Each category shows different styles",
    "🚀 Professional video editing services",
    "💡 Hover over videos for previews",
    "🎯 Click to watch full projects"
  ];

  const categoryMessages = {
    commercials: "💼 Corporate work with professional polish and brand storytelling.",
    youtube: "📺 YouTube content that engages viewers and builds communities.",
    music: "🎵 Music videos with perfect rhythm sync and creative visuals.",
    films: "🎭 Cinematic storytelling with Hollywood-level production value."
  };

  useEffect(() => {
    setCurrentMessage(0);
    setIsVisible(true);
  }, [activeCategory]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessage(prev => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  const currentCategoryMessage = categoryMessages[activeCategory as keyof typeof categoryMessages];
  const displayMessage = currentCategoryMessage || messages[currentMessage];

  return (
    <div className={`transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
    }`}>
      <div className="bg-cinema-white/95 text-cinema-black px-6 py-4 rounded-2xl rounded-tl-sm shadow-lg max-w-sm text-left relative">
        <p className="text-sm font-medium leading-relaxed">{displayMessage}</p>
        {/* Speech bubble tail pointing left */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cinema-white/95"></div>
      </div>
    </div>
  );
};

// Video Thumbnail component
const VideoThumbnail = ({ 
  video, 
  isActive, 
  onClick, 
  onHover 
}: { 
  video: any; 
  isActive: boolean; 
  onClick: () => void;
  onHover: (hover: boolean) => void;
}) => {
  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 transform ${
        isActive ? 'scale-110 z-10' : 'scale-100 hover:scale-105'
      }`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-film">
        <div className="aspect-video bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20 flex items-center justify-center">
          <div className="text-center text-cinema-white">
            <div className="text-4xl mb-2">🎬</div>
            <div className="text-sm font-light">{video.title}</div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-cinema-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Play className="w-12 h-12 text-cinema-white" />
        </div>
        
        <div className="absolute bottom-2 right-2 bg-cinema-black/80 text-cinema-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {isActive && (
          <div className="absolute top-2 left-2 w-3 h-3 bg-cinema-gold rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="mt-2 text-center">
        <h4 className="text-cinema-white text-sm font-medium truncate">{video.title}</h4>
      </div>
    </div>
  );
};

// Custom Progress Bar component
const ProgressBar = ({ 
  progress, 
  duration, 
  onSeek,
  onHover 
}: { 
  progress: number; 
  duration: number;
  onSeek: (time: number) => void;
  onHover: (time: number | null) => void;
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const time = percentage * duration;
      setHoveredTime(time);
      onHover(time);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const time = percentage * duration;
      onSeek(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <div
        ref={progressRef}
        className="w-full h-2 bg-cinema-white/20 rounded-full cursor-pointer relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredTime(null);
          onHover(null);
        }}
        onClick={handleClick}
      >
        <div 
          className="h-full bg-cinema-gold rounded-full transition-all duration-150"
          style={{ width: `${Math.min(100, (progress / duration) * 100)}%` }}
        />
        
        {hoveredTime !== null && (
          <>
            <div 
              className="absolute top-0 w-0.5 h-full bg-cinema-white/60"
              style={{ left: `${(hoveredTime / duration) * 100}%` }}
            />
            <div 
              className="absolute -top-8 transform -translate-x-1/2 bg-cinema-black/90 text-cinema-white text-xs px-2 py-1 rounded whitespace-nowrap"
              style={{ left: `${(hoveredTime / duration) * 100}%` }}
            >
              {formatTime(hoveredTime)}
            </div>
          </>
        )}
      </div>
      
      <div className="flex justify-between text-cinema-white/60 text-xs mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export const ShowreelSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('commercials');
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  const currentVideos = videoCategories.find(cat => cat.id === activeCategory)?.videos || [];
  const currentVideo = currentVideos[activeVideo];
  const duration = 120;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            setActiveVideo(current => (current + 1) % currentVideos.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentVideos.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
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

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setActiveVideo(0);
    setProgress(0);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setProgress(time);
  }, []);

  const handleVideoSelect = useCallback((index: number) => {
    setActiveVideo(index);
    setProgress(0);
  }, []);

  const handlePrevious = () => {
    setActiveVideo(prev => prev === 0 ? currentVideos.length - 1 : prev - 1);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveVideo(prev => (prev + 1) % currentVideos.length);
    setProgress(0);
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-cinema-black relative overflow-hidden py-20"
    >
      {/* Section Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-cinema-white mb-4">
          Featured <span className="bg-gradient-cinematic bg-clip-text text-transparent">Showreel</span>
        </h2>
        <p className="text-xl text-cinema-white/70 max-w-2xl mx-auto">
          Professional video editing with cinematic flair and creative storytelling
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Selector - Mobile Optimized */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="w-full max-w-lg md:max-w-none">
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 px-6 pb-2" style={{ minWidth: 'max-content' }}>
                {videoCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                      activeCategory === category.id
                        ? 'bg-cinema-gold text-cinema-black shadow-cinematic'
                        : 'bg-cinema-white/10 text-cinema-white hover:bg-cinema-white/20'
                    }`}
                    style={{
                      boxShadow: activeCategory === category.id
                        ? `0 0 20px ${category.color}40`
                        : 'none'
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Flex wrap */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-4">
              {videoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-cinema-gold text-cinema-black shadow-cinematic'
                      : 'bg-cinema-white/10 text-cinema-white hover:bg-cinema-white/20'
                  }`}
                  style={{
                    boxShadow: activeCategory === category.id
                      ? `0 0 20px ${category.color}40`
                      : 'none'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2D Camera Visualization - Mobile Responsive */}
        <div className="h-60 md:h-80 mb-8 md:mb-12 rounded-lg overflow-hidden relative bg-gradient-to-r from-cinema-black via-gray-900 to-cinema-black">
          {/* Mobile Layout: Stacked */}
          <div className="md:hidden h-full px-4">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="scale-75">
                <VintageCamera activeCategory={activeCategory} />
              </div>
              <div className="scale-90">
                <SpeechBubble activeCategory={activeCategory} />
              </div>
            </div>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden md:flex items-center h-full max-w-5xl mx-auto px-8 gap-6">
            <div className="flex-1 h-full flex items-center justify-center">
              <VintageCamera activeCategory={activeCategory} />
            </div>
            <div className="w-64 flex items-center justify-center h-full pr-4">
              <SpeechBubble activeCategory={activeCategory} />
            </div>
          </div>
        </div>

        {/* Main Video Player */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-cinema-black to-cinema-gold/10 rounded-lg overflow-hidden shadow-film relative">
              
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20">
                <div className="text-center text-cinema-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-2xl font-bold mb-2">{currentVideo?.title}</h3>
                  <p className="text-cinema-white/70">
                    {videoCategories.find(cat => cat.id === activeCategory)?.name}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-cinema-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-cinema-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-cinema-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-cinema-white" />
                  ) : (
                    <Play className="w-8 h-8 text-cinema-white ml-1" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <ProgressBar
                progress={progress}
                duration={duration}
                onSeek={handleSeek}
                onHover={setHoveredTime}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    onClick={handlePrevious}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors touch-manipulation"
                    aria-label="Previous video"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-cinema-gold text-cinema-black rounded-full hover:bg-cinema-gold/80 transition-colors touch-manipulation"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors touch-manipulation"
                    aria-label="Next video"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors touch-manipulation"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="text-cinema-white/60 text-xs sm:text-sm text-center sm:text-right">
                  {hoveredTime ? `Preview: ${Math.floor(hoveredTime / 60)}:${Math.floor(hoveredTime % 60).toString().padStart(2, '0')}` : 'Professional editing showcase'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Thumbnails Grid - Mobile Optimized */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide px-6">
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
              {currentVideos.map((video, index) => (
                <div key={video.id} className="flex-shrink-0 w-48">
                  <VideoThumbnail
                    video={video}
                    isActive={index === activeVideo}
                    onClick={() => handleVideoSelect(index)}
                    onHover={(hover) => {}}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {currentVideos.map((video, index) => (
              <VideoThumbnail
                key={video.id}
                video={video}
                isActive={index === activeVideo}
                onClick={() => handleVideoSelect(index)}
                onHover={(hover) => {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

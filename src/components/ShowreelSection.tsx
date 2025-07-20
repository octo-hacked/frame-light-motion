import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
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

// Simplified 3D Cube component 
const CategoryCube = ({ activeCategory }: { activeCategory: string }) => {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const currentCategory = videoCategories.find(cat => cat.id === activeCategory);
  const cubeColor = currentCategory?.color || '#D4AF37';

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhongMaterial 
        color={cubeColor} 
        transparent 
        opacity={0.8}
        shininess={100}
      />
    </mesh>
  );
};

// Simplified Film Strip component
const FilmStrip = ({ videos, activeVideo }: { 
  videos: any[]; 
  activeVideo: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {videos.slice(0, 4).map((video, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isActive = index === activeVideo;
        const scale = isActive ? 1.0 : 0.7;
        
        return (
          <mesh
            key={video.id}
            position={[x, 0, z]}
            scale={[scale, scale, scale]}
            rotation={[0, -angle + Math.PI/2, 0]}
          >
            <boxGeometry args={[0.8, 0.5, 0.1]} />
            <meshPhongMaterial 
              color={isActive ? '#D4AF37' : '#444'} 
              transparent 
              opacity={isActive ? 1 : 0.7}
            />
          </mesh>
        );
      })}
    </group>
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
  const thumbnailRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={thumbnailRef}
      className={`relative cursor-pointer transition-all duration-500 transform ${
        isActive ? 'scale-110 z-10' : 'scale-100 hover:scale-105'
      }`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Video Thumbnail */}
      <div className="relative overflow-hidden rounded-lg shadow-film">
        <div className="aspect-video bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20 flex items-center justify-center">
          <div className="text-center text-cinema-white">
            <div className="text-4xl mb-2">🎬</div>
            <div className="text-sm font-light">{video.title}</div>
          </div>
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-cinema-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Play className="w-12 h-12 text-cinema-white" />
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-cinema-black/80 text-cinema-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-2 left-2 w-3 h-3 bg-cinema-gold rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Video title */}
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
        {/* Progress */}
        <div 
          className="h-full bg-cinema-gold rounded-full transition-all duration-150"
          style={{ width: `${Math.min(100, (progress / duration) * 100)}%` }}
        />
        
        {/* Hover indicator */}
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
      
      {/* Time display */}
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
  const duration = 120; // Mock duration in seconds

  // Auto-play progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            // Auto-advance to next video
            setActiveVideo(current => (current + 1) % currentVideos.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentVideos.length]);

  // Section animations
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
          Explore my portfolio across different categories of video content
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
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

        {/* 3D Visualization */}
        <div className="h-64 mb-12 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <CategoryCube activeCategory={activeCategory} />
            <FilmStrip videos={currentVideos} activeVideo={activeVideo} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>

        {/* Main Video Player */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Video Container */}
            <div className="aspect-video bg-gradient-to-br from-cinema-black to-cinema-gold/10 rounded-lg overflow-hidden shadow-film relative">
              
              {/* Mock Video Content */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cinema-gold/20 to-cinema-orange/20">
                <div className="text-center text-cinema-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-2xl font-bold mb-2">{currentVideo?.title}</h3>
                  <p className="text-cinema-white/70">
                    {videoCategories.find(cat => cat.id === activeCategory)?.name}
                  </p>
                </div>
              </div>

              {/* Play/Pause Overlay */}
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

            {/* Video Controls */}
            <div className="mt-6 space-y-4">
              {/* Progress Bar */}
              <ProgressBar
                progress={progress}
                duration={duration}
                onSeek={handleSeek}
                onHover={setHoveredTime}
              />

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handlePrevious}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-cinema-gold text-cinema-black rounded-full hover:bg-cinema-gold/80 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-cinema-white hover:text-cinema-gold transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="text-cinema-white/60 text-sm">
                  {hoveredTime ? `Preview: ${Math.floor(hoveredTime / 60)}:${Math.floor(hoveredTime % 60).toString().padStart(2, '0')}` : 'Hover timeline for preview'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {currentVideos.map((video, index) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              isActive={index === activeVideo}
              onClick={() => handleVideoSelect(index)}
              onHover={(hover) => {
                // Add hover preview logic here if needed
              }}
            />
          ))}
        </div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

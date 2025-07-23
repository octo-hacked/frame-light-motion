import { useState, useRef, useEffect, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mobile swipe carousel component
export const SwipeCarousel = ({ 
  children, 
  className = "",
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000
}: {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalSlides = children.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, autoPlayInterval, totalSlides]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe left - next slide
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      } else {
        // Swipe right - previous slide
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }

    // Resume auto-play after a delay
    setTimeout(() => {
      if (autoPlay) setIsAutoPlaying(true);
    }, 2000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      if (autoPlay) setIsAutoPlaying(true);
    }, 2000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows (hidden on mobile) */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors hidden md:block"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors hidden md:block"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-cinema-gold w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-2 right-2 text-white/40 text-xs md:hidden">
        Swipe to navigate
      </div>
    </div>
  );
};

// Tap and hold reveal component
export const TapHoldReveal = ({
  children,
  revealContent,
  className = "",
  holdDuration = 800,
  hapticFeedback = true
}: {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  holdDuration?: number;
  hapticFeedback?: boolean;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressTimerRef = useRef<NodeJS.Timeout>();

  const startHold = () => {
    setIsHolding(true);
    setProgress(0);

    // Progress animation
    const startTime = Date.now();
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);
    }, 16); // ~60fps

    // Reveal after duration
    timerRef.current = setTimeout(() => {
      setIsRevealed(true);
      setProgress(100);
      
      // Haptic feedback on mobile
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      clearInterval(progressTimerRef.current!);
    }, holdDuration);
  };

  const endHold = () => {
    setIsHolding(false);
    setProgress(0);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
  };

  const closeReveal = () => {
    setIsRevealed(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        className="select-none cursor-pointer relative"
      >
        {children}
        
        {/* Progress indicator */}
        {isHolding && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#F4D03F"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
                  className="transition-all duration-75 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Revealed content modal */}
      {isRevealed && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-cinema-black/95 backdrop-blur-md border border-cinema-gold/30 rounded-xl p-6">
            <button
              onClick={closeReveal}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
            {revealContent}
          </div>
        </div>
      )}

      {/* Mobile hint */}
      <div className="absolute bottom-2 left-2 text-white/40 text-xs md:hidden">
        Hold to reveal
      </div>
    </div>
  );
};

// Mobile-optimized touch gestures hook
export const useMobileGestures = () => {
  const [gesture, setGesture] = useState<{
    type: 'swipe' | 'pinch' | 'tap' | null;
    direction?: 'left' | 'right' | 'up' | 'down';
    scale?: number;
  }>({ type: null });

  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const touchesRef = useRef<Touch[]>([]);

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    touchesRef.current = Array.from(e.touches);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0];
    const { x: startX, y: startY, time: startTime } = touchStartRef.current;
    const deltaX = touchEnd.clientX - startX;
    const deltaY = touchEnd.clientY - startY;
    const deltaTime = Date.now() - startTime;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Tap detection
    if (distance < 10 && deltaTime < 300) {
      setGesture({ type: 'tap' });
      return;
    }

    // Swipe detection
    if (distance > 50 && deltaTime < 500) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up');
      
      setGesture({ type: 'swipe', direction });
    }

    // Reset gesture after a delay
    setTimeout(() => setGesture({ type: null }), 100);
  };

  return {
    gesture,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    }
  };
};

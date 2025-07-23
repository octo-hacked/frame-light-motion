import { lazy, Suspense, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LazyLoad from 'react-lazyload';

// Lazy loading wrapper for 3D components
export const Lazy3D = ({ children, height = 400, offset = 100 }: {
  children: React.ReactNode;
  height?: number;
  offset?: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: `${offset}px`,
  });

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {inView ? (
        <Suspense fallback={
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cinema-gold"></div>
          </div>
        }>
          {children}
        </Suspense>
      ) : (
        <div className="flex items-center justify-center bg-gray-900/20 rounded-lg" style={{ height }}>
          <div className="text-cinema-white/40 text-sm">Loading 3D Scene...</div>
        </div>
      )}
    </div>
  );
};

// Lazy loading wrapper for images
export const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  placeholder = "bg-gray-800"
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}) => {
  return (
    <LazyLoad height={height || 200} offset={150} once>
      <img 
        src={src} 
        alt={alt} 
        className={className}
        width={width}
        height={height}
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
        }}
      />
    </LazyLoad>
  );
};

// Lazy loading wrapper for videos
export const LazyVideo = ({ 
  src, 
  poster, 
  className = "",
  autoPlay = false,
  loop = false,
  muted = true 
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {inView ? (
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-cinema-white/40 text-sm">Video will load when visible</div>
        </div>
      )}
    </div>
  );
};

// Lottie lazy wrapper
export const LazyLottie = ({ 
  animationData, 
  height = 200,
  autoplay = false,
  loop = true,
  className = ""
}: {
  animationData: any;
  height?: number;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [LottieComponent, setLottieComponent] = useState<any>(null);

  useEffect(() => {
    if (inView && !LottieComponent) {
      import('lottie-react').then((module) => {
        setLottieComponent(() => module.default);
      });
    }
  }, [inView, LottieComponent]);

  return (
    <div ref={ref} style={{ height }} className={className}>
      {inView && LottieComponent ? (
        <LottieComponent
          animationData={animationData}
          height={height}
          autoplay={autoplay}
          loop={loop}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-900/20">
          <div className="text-cinema-white/40 text-sm">Loading animation...</div>
        </div>
      )}
    </div>
  );
};

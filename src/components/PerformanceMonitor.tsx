import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we're in development and user wants to see metrics
    if (process.env.NODE_ENV === 'development') {
      const urlParams = new URLSearchParams(window.location.search);
      setIsVisible(urlParams.get('perf') === 'true');
    }

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setMetrics({
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        });
      }

      // Web Vitals
      if ('web-vitals' in window) {
        // This would require web-vitals library, but we'll simulate
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
            }
            if (entry.entryType === 'largest-contentful-paint') {
              setMetrics(prev => ({ ...prev, largestContentfulPaint: entry.startTime }));
            }
          }
        });

        try {
          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        } catch (e) {
          console.log('Performance observer not supported');
        }
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, []);

  return { metrics, isVisible };
};

export const PerformanceIndicator = () => {
  const { metrics, isVisible } = usePerformanceMonitor();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs font-mono">
      <div className="mb-2 font-semibold text-cinema-gold">Performance Metrics</div>
      <div className="space-y-1">
        {metrics.loadTime && (
          <div>Load: {Math.round(metrics.loadTime)}ms</div>
        )}
        {metrics.domContentLoaded && (
          <div>DOM: {Math.round(metrics.domContentLoaded)}ms</div>
        )}
        {metrics.firstContentfulPaint && (
          <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
        )}
        {metrics.largestContentfulPaint && (
          <div>LCP: {Math.round(metrics.largestContentfulPaint)}ms</div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Add ?perf=true to URL to show
      </div>
    </div>
  );
};

// Resource loading monitor
export const ResourceMonitor = () => {
  const [resources, setResources] = useState<PerformanceResourceTiming[]>([]);

  useEffect(() => {
    const updateResources = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      setResources(entries);
    };

    // Update on page load
    window.addEventListener('load', updateResources);
    
    // Also update periodically to catch lazy-loaded resources
    const interval = setInterval(updateResources, 2000);

    return () => {
      window.removeEventListener('load', updateResources);
      clearInterval(interval);
    };
  }, []);

  const imageResources = resources.filter(r => r.name.includes('image') || r.name.includes('.jpg') || r.name.includes('.png') || r.name.includes('.webp'));
  const scriptResources = resources.filter(r => r.name.includes('.js'));
  const styleResources = resources.filter(r => r.name.includes('.css'));

  return {
    totalResources: resources.length,
    images: imageResources.length,
    scripts: scriptResources.length,
    styles: styleResources.length,
    totalSize: resources.reduce((acc, r) => acc + (r.transferSize || 0), 0),
  };
};

// Mobile performance optimizations
export const useMobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast');

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    // Detect connection speed
    const checkConnection = () => {
      // @ts-ignore - experimental API
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        setConnectionSpeed(effectiveType === '4g' ? 'fast' : 'slow');
      }
    };

    checkMobile();
    checkConnection();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return {
    isMobile,
    connectionSpeed,
    shouldLazyLoad: isMobile || connectionSpeed === 'slow',
    shouldReduceAnimations: isMobile && connectionSpeed === 'slow',
  };
};

import { useState, useEffect } from 'react';

export const useAppLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If user has already visited in this session, skip loading
      setIsLoading(false);
      setHasLoadedOnce(true);
      return;
    }

    // Simulate loading time for assets and initial setup
    const minLoadingTime = 3500; // Minimum 3.5 seconds for cinematic effect
    const startTime = Date.now();

    // Preload critical assets
    const preloadAssets = async () => {
      const promises: Promise<void>[] = [];

      // Preload any critical images or resources
      const criticalAssets = [
        // Add any critical asset URLs here
      ];

      criticalAssets.forEach(src => {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Still resolve to not block loading
          img.src = src;
        });
        promises.push(promise);
      });

      // Wait for all assets to load or timeout
      const assetTimeout = new Promise<void>(resolve => 
        setTimeout(resolve, 2000) // 2 second timeout
      );
      
      await Promise.race([
        Promise.all(promises),
        assetTimeout
      ]);
    };

    const handleLoad = async () => {
      await preloadAssets();
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
        setHasLoadedOnce(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, remainingTime);
    };

    // If document is already loaded, start the loading process
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for window load event
      window.addEventListener('load', handleLoad);
      
      // Fallback in case load event doesn't fire
      const fallbackTimer = setTimeout(handleLoad, minLoadingTime + 1000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
    setHasLoadedOnce(true);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return {
    isLoading,
    hasLoadedOnce,
    completeLoading
  };
};

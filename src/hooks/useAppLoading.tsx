import { useState, useEffect } from 'react';

export const useAppLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // If user has already visited, skip loading
      setIsLoading(false);
      setHasLoadedOnce(true);
      return;
    }

    // Simulate loading time for assets and initial setup
    const minLoadingTime = 3000; // Minimum 3 seconds for cinematic effect
    const startTime = Date.now();

    // Wait for DOM to be fully loaded
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
        setHasLoadedOnce(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, remainingTime);
    };

    // If document is already loaded, start the timer
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

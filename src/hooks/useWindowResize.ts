import { useState, useEffect } from 'react';

export const useWindowResize = () => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const handleResize = () => setTrigger(prev => prev + 1);
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return trigger;
};
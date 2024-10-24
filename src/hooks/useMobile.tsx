import { useState, useEffect } from 'react';
import theme from '../styles/theme';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${theme.breakpoints.small - 1}px)`
    );

    const handleMediaChange = () => setIsMobile(mediaQuery.matches);

    handleMediaChange();

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return isMobile;
};

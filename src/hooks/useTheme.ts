import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const initialTheme = storage.getTheme();
    return initialTheme;
  });

  useEffect(() => {
    storage.setTheme(theme);
    
    // Update document class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
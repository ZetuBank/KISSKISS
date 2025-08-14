import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, type Theme } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('kiss-theme') || 'light';
    const savedTheme = themes.find(theme => theme.id === savedThemeId) || themes[0];
    setCurrentTheme(savedTheme);
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('kiss-theme', themeId);
      
      const html = document.documentElement;
      const root = document.documentElement.style;
      
      // Remove existing theme classes
      html.classList.remove('dark', 'theme-ocean', 'theme-sunset', 'theme-forest', 'theme-purple');
      
      // Apply new theme
      if (theme.isDark) {
        html.classList.add('dark');
      }
      
      if (theme.id !== 'light' && theme.id !== 'dark') {
        html.classList.add(`theme-${theme.id}`);
      }
      
      // Update CSS custom properties
      root.setProperty('--theme-primary', theme.primary);
      root.setProperty('--theme-secondary', theme.secondary);
      
      // Notify iframes about theme change
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'themeChange' }, '*');
        }
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset, ThemeConfig } from '../types';

export const THEME_PRESETS: Record<ThemePreset, ThemeConfig> = {
  indigo: {
    preset: 'indigo',
    primaryColor: '#4f46e5',
    primaryBg: '#f8fafc',
    accentBg: '#e0e7ff',
    isDark: false,
  },
  emerald: {
    preset: 'emerald',
    primaryColor: '#059669',
    primaryBg: '#fdfbf7',
    accentBg: '#d1fae5',
    isDark: false,
  },
  violet: {
    preset: 'violet',
    primaryColor: '#7c3aed',
    primaryBg: '#faf5ff',
    accentBg: '#ede9fe',
    isDark: false,
  },
  crimson: {
    preset: 'crimson',
    primaryColor: '#e11d48',
    primaryBg: '#fff5f5',
    accentBg: '#ffe4e6',
    isDark: false,
  },
  teal: {
    preset: 'teal',
    primaryColor: '#0d9488',
    primaryBg: '#f0fdfa',
    accentBg: '#ccfbf1',
    isDark: false,
  },
  obsidian: {
    preset: 'obsidian',
    primaryColor: '#6366f1',
    primaryBg: '#0f172a',
    accentBg: '#312e81',
    isDark: true,
  },
};

interface ThemeContextType {
  activePreset: ThemePreset;
  themeConfig: ThemeConfig;
  setThemePreset: (preset: ThemePreset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePreset, setActivePreset] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem('agentpulse_theme_preset');
    return (saved as ThemePreset) || 'indigo';
  });

  const themeConfig = THEME_PRESETS[activePreset] || THEME_PRESETS.indigo;

  useEffect(() => {
    localStorage.setItem('agentpulse_theme_preset', activePreset);
    const root = document.documentElement;
    
    if (themeConfig.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties for dynamic color binding
    root.style.setProperty('--theme-primary', themeConfig.primaryColor);
    root.style.setProperty('--theme-bg', themeConfig.primaryBg);
    root.style.setProperty('--theme-accent-bg', themeConfig.accentBg);
  }, [activePreset, themeConfig]);

  return (
    <ThemeContext.Provider value={{ activePreset, themeConfig, setThemePreset: setActivePreset }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          themeConfig.isDark
            ? 'bg-slate-900 text-slate-100'
            : 'bg-slate-50 text-slate-900'
        }`}
        style={{
          backgroundColor: themeConfig.primaryBg,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DefaultTheme, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof DefaultTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Custom brand colors (matches your Leh Wi Tok purple)
  const lightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#C0266F',
      onPrimary: '#FFFFFF',
      secondary: '#6D28D9',
      background: '#F8F9FA',
      surface: '#FFFFFF',
      onSurface: '#1F2937',
    },
  };

  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#F472B6',
      onPrimary: '#1F2937',
      secondary: '#A78BFA',
      background: '#0F172A',
      surface: '#1E2937',
      onSurface: '#E2E8F0',
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('@lehwitok/theme');
      if (saved) setIsDarkMode(saved === 'dark');
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('@lehwitok/theme', newMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within ThemeProvider');
  return context;
};

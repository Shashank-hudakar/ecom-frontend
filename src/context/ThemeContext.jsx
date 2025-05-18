import React, { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

const themes = {
  light: {
    background: '#ffffff',
    text: '#333333',
    primary: '#3a0ca3',
    secondary: '#4361ee',
    accent: '#f72585',
    cardBg: '#ffffff',
    cardBorder: '#e5e7eb',
    cardShadow: '0 2px 8px rgba(0,0,0,0.1)',
    buttonBg: '#3a0ca3',
    buttonText: '#ffffff',
    headerBg: '#ffffff',
    headerText: '#333333',
    inputBg: '#ffffff',
    inputBorder: '#e5e7eb',
    inputText: '#333333',
    gradient: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
    hoverBg: '#f8f9fa',
    borderColor: '#e5e7eb',
    success: '#2b9348',
    error: '#dc2626',
    warning: '#fbbf24',
    info: '#3b82f6',
    transition: 'all 0.3s ease-in-out'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#7209b7',
    secondary: '#4cc9f0',
    accent: '#f72585',
    cardBg: '#2d2d2d',
    cardBorder: '#404040',
    cardShadow: '0 2px 8px rgba(0,0,0,0.3)',
    buttonBg: '#7209b7',
    buttonText: '#ffffff',
    headerBg: '#2d2d2d',
    headerText: '#ffffff',
    inputBg: '#2d2d2d',
    inputBorder: '#404040',
    inputText: '#ffffff',
    gradient: 'linear-gradient(135deg, #7209b7 0%, #4cc9f0 100%)',
    hoverBg: '#363636',
    borderColor: '#404040',
    success: '#34d399',
    error: '#ef4444',
    warning: '#fbbf24',
    info: '#60a5fa',
    transition: 'all 0.3s ease-in-out'
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add transition class to body
    document.body.classList.add('theme-transition');
    
    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    colors: themes[theme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
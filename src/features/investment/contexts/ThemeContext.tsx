import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false });

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // You can expand this to include theme switching logic if needed
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

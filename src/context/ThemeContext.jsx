import React, { createContext, useContext, useState, useEffect } from 'react';
import useCustomizer from '../hooks/useCustomizer';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const { bgColor, fontFamilyH1, fontFamilyH2, fontFamilyH3, fontFamilyBody, navColor, primaryButtonColor } = useCustomizer();

  const value = {
    bgColor,
    fontFamilyH1,
    fontFamilyH2,
    fontFamilyH3,
    fontFamilyBody,
    navColor,
    primaryButtonColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

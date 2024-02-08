import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

 export const ThemeProvider = ({ children }) => {
  const [sidebarColor, setSidebarColor] = useState('#53a8b6');

  const changeSidebarColor = (newColor) => {
    setSidebarColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ sidebarColor, changeSidebarColor }}>
      {children}
    </ThemeContext.Provider>
  );
};




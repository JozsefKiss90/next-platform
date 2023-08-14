import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children } : any) => {
  const [isHovered, setIsHovered] = useState(false);

  //ide behozni a a layoutból a value

  return (
    <AppContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </AppContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children } : any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AppContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </AppContext.Provider>
  );
};

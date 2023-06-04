import React, { ReactNode, createContext, useState  } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

interface AppContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext= createContext({});

export default function Layout({ children }: LayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <AppContext.Provider value={{ isHovered, setIsHovered } as AppContextValue}>
      <main>{children}</main>
    </AppContext.Provider>
   
  )
}
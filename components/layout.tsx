import React, { ReactNode, createContext, useState  } from "react";
import styles from '../styles/Layout.module.scss'

interface LayoutProps {
  children: React.ReactNode;
}

interface AppContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AppContext= createContext({});

export default function Layout({ children }: LayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode)
  return (
    <AppContext.Provider value={{ isHovered, setIsHovered, isDarkMode, setIsDarkMode } as AppContextValue}>
      <main className={isDarkMode ? styles.dark_mode : ''}>{children}</main>
    </AppContext.Provider>
   
  )
}
import React, { ReactNode, createContext, useState  } from "react";
import styles from '../styles/Layout.module.scss'
import CookieConsent from './cookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

interface AppContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
 
interface AppContextValue {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext= createContext({});

export default function Layout({ children }: LayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  console.log(isLogin)

  return (
    <AppContext.Provider value={{isHovered, setIsHovered, isDarkMode, setIsDarkMode, isLogin, setIsLogin} as AppContextValue}>
      <CookieConsent />
      <main className={`${isLogin ? styles.bg_class : ""} ${isDarkMode ? styles.dark_mode : ''}`}>{children}</main>
    </AppContext.Provider>   
  )
}  
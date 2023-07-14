import React, { ReactNode, createContext, useState  } from "react";
import styles from '../styles/Layout.module.scss'
import CookieConsent from './cookieConsent';
const languageData = require('../public/static/language.json');
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
  languageData: string[]
  language: boolean
  setLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext= createContext({});

export default function Layout({ children }: LayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [language, setLanguage] = useState(true) 

  return (
    <AppContext.Provider value={{isHovered, setIsHovered, isDarkMode, setIsDarkMode, isLogin, setIsLogin, languageData, language, setLanguage} as AppContextValue}>
      <CookieConsent />
      <main  className={`${isLogin ?( styles.bg_class) : ""} ${isDarkMode ? styles.dark_mode : ''}`}>{children}</main>
    </AppContext.Provider>   
  )
}  
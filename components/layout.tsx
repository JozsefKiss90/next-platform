import React, { ReactNode, createContext, useState  } from "react";
import styles from '../styles/Layout.module.scss'
import CookieConsent from './cookieConsent';
//const languageData = require('../public/static/language.json');
import languageData from '../public/static/language.json'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { LayoutAppContextValue, LayoutProps } from "../types/types";
 
export const AppContext= createContext({});

export default function Layout({ children }: LayoutProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [language, setLanguage] = useState(true) 

  return (
    <AppContext.Provider value={{ isHovered, setIsHovered, isDarkMode, setIsDarkMode, isLogin, setIsLogin, languageData, language, setLanguage } as unknown as LayoutAppContextValue}>
      <CookieConsent />
      <main  className={`${isLogin ?( styles.bg_class) : ""} ${isDarkMode ? styles.dark_mode : ''}`}>{children}</main>
    </AppContext.Provider>   
  )
}  
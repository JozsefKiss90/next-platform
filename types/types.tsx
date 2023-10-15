import { Session } from "next-auth";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { AppProps } from 'next/app'

export interface NavItems {
    titleKey: string;
    path: string;
    iconPath: string;
    grayscaleKey: string;
    hoverEffectClass: string;
    iconWidth: number;
    iconHeight: number;
    signOut?: boolean | undefined;
  }

export interface LoginHandlersProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    language: boolean;
    baseUrl: string;
  }

export interface Grayscale {
    [key: string]: string;
  }
  
 export interface IconStateSetter {
    setDesktopIcon: Dispatch<SetStateAction<string>>,
    setExperimentIcon: Dispatch<SetStateAction<string>>,
    setGameIcon: Dispatch<SetStateAction<string>>,
    setProfileIcon: Dispatch<SetStateAction<string>>,
    setInfoIcon: Dispatch<SetStateAction<string>>,
    setMessageIcon: Dispatch<SetStateAction<string>>,
    setLogoutIcon: Dispatch<SetStateAction<string>>,
    setGrayscale: Dispatch<SetStateAction<Grayscale>>,
  }
  
export interface IconStateUdpater {
    currentUrl: string, 
    setGrayscale: Dispatch<SetStateAction<Grayscale>>,
    grayscaleObj: Grayscale, 
    setDesktopIcon: Dispatch<SetStateAction<string>>, 
    handleIconTitle: (title: string) => void, 
    setExperimentIcon: Dispatch<SetStateAction<string>>, 
    setGameIcon: Dispatch<SetStateAction<string>>,  
    setProfileIcon: Dispatch<SetStateAction<string>>,  
    setInfoIcon: Dispatch<SetStateAction<string>>, 
    setLogoutIcon : Dispatch<SetStateAction<string>>, 
  }

export type GameStateType = {
  checked: boolean,
  rank: string,
  bestRank: string,
  time: number,
};

export type RefObject = {
    containerRef: MutableRefObject<any>
    buttonRef: MutableRefObject<any>
    instructionRef: MutableRefObject<any>
    gridRef: MutableRefObject<any>
    setStarted: Dispatch<SetStateAction<boolean>>
    started: boolean
    displayInstruction: boolean
  }
  
export interface IGamePlugin {
    initialize: (
      email: string,
      container: RefObject,
      displayInstruction?: Dispatch<SetStateAction<boolean>>
    ) => void | (() => void)
  }
  
export interface TaskProps {
    email?: string
    taskRef?: RefObject
    setDisplayInstruction?: Dispatch<SetStateAction<boolean>>
  }

export interface UserData {
    email: string
    taskName: string
    taskResult: number 
}

export interface GameStat {
    _id: string
    game: string
    email: string
    rank: string
    bestRank: string
    gameTime: number
    age: number
    __v: number
}

export interface UserProps {
    session: Session | null | undefined
    userStats: GameStat | null | undefined
}

export interface AppContextValue {
    isHovered: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    languageData: any
    language: boolean
}

export interface NavAppContextValue {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    languageData: any
    language: boolean
    setLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  }

export interface ProfileAppContextValue {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    languageData: any
    language: boolean
  }

export interface LanguageProps {
    language: boolean;
    setLanguage: React.Dispatch<React.SetStateAction<boolean>>;
    session:  Session 
}

export interface LayoutAppContextValue {
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

export interface LayoutProps {
    children: React.ReactNode;
  }

export interface ProgressProps {
    completed : number
  }

export interface LoginAppContextValue {
    isLogin: boolean
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    languageData: any
    language: boolean
  }

export interface GameUserProps {
    session: Session | null | undefined;
  }

export interface GameAppContextValue {
    isHovered: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }

export type AppPropsWithSession = AppProps & {
    pageProps: {
      session: Session | null;
    };
  };
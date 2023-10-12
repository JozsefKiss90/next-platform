import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import React, { useState } from 'react';

interface Grayscale {
  [key: string]: string;
}

interface IconStateSetter {
  setDesktopIcon: Dispatch<SetStateAction<string>>,
  setExperimentIcon: Dispatch<SetStateAction<string>>,
  setGameIcon: Dispatch<SetStateAction<string>>,
  setProfileIcon: Dispatch<SetStateAction<string>>,
  setInfoIcon: Dispatch<SetStateAction<string>>,
  setMessageIcon: Dispatch<SetStateAction<string>>,
  setLogoutIcon: Dispatch<SetStateAction<string>>,
  setGrayscale: Dispatch<SetStateAction<Grayscale>>,
}

interface IconStateUdpater {
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

export const grayscaleObj : Grayscale  = {
    grayscale_desktop : '',
    grayscale_experiment : '',
    grayscale_game : '',
    grayscale_profile : '',
    grayscale_info : '',
    grayscale_message : '',
    grayscale_logout: '',
  }

  export function NavbarState() {
    const router = useRouter();
    const currentUrl = router.asPath;
  
    
    const [desktopIcon, setDesktopIcon] = useState("/img/icons/svgDesktop_2.svg")
    const [experimentIcon, setExperimentIcon] = useState("/img/icons/svgFlask_2.svg")
    const [gameIcon, setGameIcon] = useState("/img/icons/svgAlien_2.svg")
    const [profileIcon, setProfileIcon] = useState("/img/icons/svgProfile_2.svg")
    const [infoIcon, setInfoIcon] = useState("/img/icons/svgInfo_2.svg")
    const [messageIcon, setMessageIcon] = useState("/img/icons/svgEnvelope_2.svg")
    const [logoutIcon, setLogoutIcon] = useState("/img/icons/svgPower_2.svg")
    const [isMobile, setIsMobile] = useState(false);
    const [grayscale, setGrayscale] = useState(grayscaleObj)
    const [iconTitle, setIconTitle] = useState<string>('')
  
    const iconSetters = useIconSetters();
  
    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 896); 
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize); 
      };
    }, []);
  
    useEffect(() => {
      handleIconUpdates(
        { currentUrl, setGrayscale, grayscaleObj, setDesktopIcon, handleIconTitle, setExperimentIcon, setGameIcon, setProfileIcon, setInfoIcon, setLogoutIcon}
      )
    }, []);

    const handleIconTitle = (title : string) => {
      setIconTitle(title);
    };
  
    return {
      grayscale, 
      iconTitle, 
      desktopIcon, 
      experimentIcon, 
      gameIcon, 
      profileIcon, 
      infoIcon, 
      messageIcon, 
      logoutIcon, 
      isMobile, 
      iconSetters,
      handleIconTitle, 
      setExperimentIcon,
      setGrayscale
  };
  }

const useIconSetters = () => {
    
    const grayscaleObj : Grayscale  = {
        grayscale_desktop : '',
        grayscale_experiment : '',
        grayscale_game : '',
        grayscale_profile : '',
        grayscale_info : '',
        grayscale_message : '',
        grayscale_logout: '',
    }

    const [desktopIcon, setDesktopIcon] = useState("/img/icons/svgDesktop_2.svg")
    const [experimentIcon, setExperimentIcon] = useState("/img/icons/svgFlask_2.svg")
    const [gameIcon, setGameIcon] = useState("/img/icons/svgAlien_2.svg")
    const [profileIcon, setProfileIcon] = useState("/img/icons/svgProfile_2.svg")
    const [infoIcon, setInfoIcon] = useState("/img/icons/svgInfo_2.svg")
    const [messageIcon, setMessageIcon] = useState("/img/icons/svgEnvelope_2.svg")
    const [logoutIcon, setLogoutIcon] = useState("/img/icons/svgPower_2.svg")
    const [grayscale, setGrayscale] = useState<Grayscale>(grayscaleObj)
   
    const iconSetters = {
        setDesktopIcon,
        setExperimentIcon,
        setGameIcon,
        setProfileIcon,
        setInfoIcon,
        setMessageIcon,
        setLogoutIcon,
        setGrayscale
      };
    return iconSetters;
};

export const handleIconUpdates = (
    {
    currentUrl, 
    setGrayscale,
    grayscaleObj,
    setDesktopIcon,
    handleIconTitle,
    setExperimentIcon,
    setGameIcon,
    setProfileIcon,
    setInfoIcon,
    setLogoutIcon,
} : IconStateUdpater
) => {
    if (currentUrl === "/") {
        setGrayscale({...grayscaleObj, grayscale_desktop: 'grayscale(0)'});
        setDesktopIcon("/img/icons/svgDesktop.svg");
        handleIconTitle('Desktop');
    } else if (currentUrl === "/experiments") {
        handleIconTitle('Experiments');
        setExperimentIcon("/img/icons/svgFlask.svg");
        setGrayscale({...grayscaleObj, grayscale_experiment: 'grayscale(0)'});
    } else if (currentUrl === "/games") {
        handleIconTitle('Games');
        setGameIcon("/img/icons/svgAlien.svg");
        setGrayscale({...grayscaleObj, grayscale_game: 'grayscale(0)'});
    } else if (currentUrl === "/user_form") {
        handleIconTitle('Profile');
        setProfileIcon("/img/icons/svgProfile.svg");
        setGrayscale({...grayscaleObj, grayscale_profile: 'grayscale(0)'});
    } else if (currentUrl === "/info") { 
        handleIconTitle('Information');
        setInfoIcon("/img/icons/svgInfo.svg");
        setGrayscale({...grayscaleObj, grayscale_info: 'grayscale(0)'});
    } else if (currentUrl === "/messages") { 
        handleIconTitle('Messages');
        setLogoutIcon("/img/icons/svgEnvelope.svg");
        setGrayscale({...grayscaleObj, grayscale_message: 'grayscale(0)'});
    }
};


export const resetIconStates = (
    targetIconState:string,
    {
        setDesktopIcon,
        setExperimentIcon,
        setGameIcon,
        setProfileIcon,
        setInfoIcon,
        setMessageIcon,
        setLogoutIcon,
        setGrayscale
    }:IconStateSetter
    ) => {
    setDesktopIcon(targetIconState === 'desktop' ? "/img/icons/svgDesktop.svg" : "/img/icons/svgDesktop_2.svg");
    setExperimentIcon(targetIconState === 'experiment' ? "/img/icons/svgFlask.svg" : "/img/icons/svgFlask_2.svg");
    setGameIcon(targetIconState === 'game' ? "/img/icons/svgAlien.svg" : "/img/icons/svgAlien_2.svg");
    setProfileIcon(targetIconState === 'profile' ? "/img/icons/svgProfile.svg" : "/img/icons/svgProfile_2.svg");
    setInfoIcon(targetIconState === 'info' ? "/img/icons/svgInfo.svg" : "/img/icons/svgInfo_2.svg");
    setMessageIcon(targetIconState === 'message' ? "/img/icons/svgEnvelope.svg" : "/img/icons/svgEnvelope_2.svg");
    setLogoutIcon(targetIconState === 'logout' ? "/img/icons/svgPower.svg" : "/img/icons/svgPower_2.svg");
    setGrayscale({
      grayscale_desktop: targetIconState === 'desktop' ? 'grayscale(0)' : '',
      grayscale_experiment: targetIconState === 'experiment' ? 'grayscale(0)' : '',
      grayscale_game: targetIconState === 'game' ? 'grayscale(0)' : '',
      grayscale_profile: targetIconState === 'profile' ? 'grayscale(0)' : '',
      grayscale_info: targetIconState === 'info' ? 'grayscale(0)' : '',
      grayscale_message: targetIconState === 'message' ? 'grayscale(0)' : '',
      grayscale_logout: targetIconState === 'logout' ? 'grayscale(0)' : ''
    });
  };

 /*interface ResetItem {
    titleKey: string;
  }

  export const handleReset = (item:ResetItem,
    {
        setDesktopIcon,
        setExperimentIcon,
        setGameIcon,
        setProfileIcon,
        setInfoIcon,
        setMessageIcon,
        setLogoutIcon,
        setGrayscale
      }: IconStateSetter) => {
    resetIconStates(item.titleKey.toLowerCase(), {
      setDesktopIcon,
      setExperimentIcon,
      setGameIcon,
      setProfileIcon,
      setInfoIcon,
      setMessageIcon,
      setLogoutIcon,
      setGrayscale
    });
  }*/
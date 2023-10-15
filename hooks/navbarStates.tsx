import { useRouter } from "next/router"; 
import { useState, useEffect } from "react";
import { grayscaleObj, useIconSetters } from "../hooks/iconHandler";



export function NavbarState() {
  const router = useRouter();
  const currentUrl = router.asPath;
 
  const [grayscale, setGrayscale] = useState(grayscaleObj)
  const [iconTitle, setIconTitle] = useState<string>('')

  const [desktopIcon, setDesktopIcon] = useState("/img/icons/svgDesktop_2.svg")
  const [experimentIcon, setExperimentIcon] = useState("/img/icons/svgFlask_2.svg")
  const [gameIcon, setGameIcon] = useState("/img/icons/svgAlien_2.svg")
  const [profileIcon, setProfileIcon] = useState("/img/icons/svgProfile_2.svg")
  const [infoIcon, setInfoIcon] = useState("/img/icons/svgInfo_2.svg")
  const [messageIcon, setMessageIcon] = useState("/img/icons/svgEnvelope_2.svg")
  const [logoutIcon, setLogoutIcon] = useState("/img/icons/svgPower_2.svg")
  const [isMobile, setIsMobile] = useState(false);

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
      { currentUrl, setGrayscale, grayscaleObj, setDesktopIcon, setExperimentIcon, setGameIcon, setProfileIcon, setInfoIcon, setLogoutIcon}
    )
  }, []);

  return {
    grayscale, iconTitle, desktopIcon, experimentIcon, gameIcon, profileIcon, infoIcon, messageIcon, logoutIcon, isMobile, iconSetters
  };
}

 const handleIconUpdates = (
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
} : any
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
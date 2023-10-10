import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react";
import { AppContext } from "./layout"
import {useContext, useEffect, useState } from "react";
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; 
import styles2 from "../styles/Index.module.scss"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from "next/router"; 
import { navItems } from "../hooks/navItems";
import {handleIconUpdates, resetIconStates, useIconSetters, grayscaleObj } from "../hooks/iconHandler";
import LanguageToggler from './LanguageToggler'; 

interface AppContextValue {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    languageData: any
    language: boolean
    setLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  }

interface NavItems {
  titleKey: string;
  path: string;
  iconPath: string;
  grayscaleKey: string;
  hoverEffectClass: string;
  iconWidth: number;
  iconHeight: number;
  signOut?: boolean | undefined;
}

interface Grayscale {
  [key: string]: string;
}

export default function Navbar(){

  const { setIsHovered, setIsLogin, isDarkMode, languageData, language, setLanguage} = useContext(AppContext) as AppContextValue;;
  const { data: session, status } = useSession(); 

  if(session) {
    setIsLogin(true)
  }

  const router = useRouter();
  const currentUrl = router.asPath;
  console.log(currentUrl)

  const [grayscale, setGrayscale] = useState<Grayscale>(grayscaleObj)
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

  const handleReset = (item:any) => {
    resetIconStates(item.titleKey.toLowerCase(), iconSetters);
  }

  const handleIconTitle = (title : string) => {
    setIconTitle(title)
  }
  
  const handleMouseEnter = () => {
      setIsHovered(true);
  };

  const handleMouseLeave = () => {
      setIsHovered(false);
  };

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
      { currentUrl, 
      setGrayscale, 
      grayscaleObj, 
      setDesktopIcon, 
      handleIconTitle, 
      setExperimentIcon, 
      setGameIcon, 
      setProfileIcon, 
      setInfoIcon, 
      setLogoutIcon}
    )
  }, []);
return (
    <div className={styles.main_container}>
      <nav className={styles.mobile_navbar} style={isDarkMode ? { filter: "grayscale(100%)" } : {}}>
        <div className={styles.mobile_navbar_nav}>
          <h1 className={`${styles.mobile_logo}`}>
            ESPORT LAB
          </h1>
        </div>
      </nav>
      {isMobile && (
      <div className={styles.iconTitle}>
        <h4>{iconTitle}</h4>
      </div> 
      )}
      <nav className={styles.navbar} style={isDarkMode ? { filter: "grayscale(100%)" } : {}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SimpleBar  className={styles.scroll_container}  style={{ height: '100%'}}>
        <ul style={{ opacity: '1' }} className={`${styles.navbar_nav} ${!session && status !== 'loading' ? styles.loading : styles.loaded}`}>
          <li className={styles.logo}>
            <Link href={""} className={styles.nav_link_arrow}>
              <span className={`${styles.link_text} ${styles.logo_text}`}>Esport Lab</span>
              <Image
                className={`${styles.icon_style} ${styles.svg_icon}`}
                src="/img/icons/arrowSvg.svg"
                alt="SVG Icon"
                width={50}
                height={50}
              />
            </Link>
          </li>
          {navItems.map((item, index) => (
          <li 
            key={index}
            className={styles.nav_item}
            onTouchStart={() => {
              handleIconTitle(item.titleKey);
              setExperimentIcon(item.iconPath);
              setGrayscale({ ...grayscaleObj, [item.grayscaleKey]: 'grayscale(0)' });
              handleReset(item);
            }}
          >
          <Link 
            href={{ pathname: item.path }} 
            className={styles.nav_link} 
            style={{ filter: `${grayscale[item.grayscaleKey]}` }}
            onClick={(e) => { 
              item.signOut && (e.preventDefault(), signOut());
            }}
          >
            <Image
              className={`${styles.icon_style} styles.${item.hoverEffectClass}`}
              src={item.iconPath}
              alt="SVG Icon"
              width={item.iconWidth}
              height={item.iconHeight}
            />
            <span className={styles.link_text}>
              {language 
                ? languageData.hun.navbar[index] 
                : languageData.eng.navbar[index]}
            </span>
          </Link>
        </li>
      ))}
    </ul>
    </SimpleBar>
  </nav>
  {session && (
      <LanguageToggler language={language} setLanguage={setLanguage} session={session} />
  )}
</div> 
  );
}
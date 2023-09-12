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

interface AppContextValue {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    languageData: any
    language: boolean
    setLanguage: React.Dispatch<React.SetStateAction<boolean>>;
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


    const grayscaleObj = {
      grayscale_desktop : '',
      grayscale_experiment : '',
      grayscale_game : '',
      grayscale_profile : '',
      grayscale_info : '',
      grayscale_message : '',
      grayscale_logout: '',
    }
    const [grayscale, setGrayscale] = useState(grayscaleObj)
    const [iconTitle, setIconTitle] = useState('')

    const [desktopIcon, setDesktopIcon] = useState("/img/icons/svgDesktop_2.svg")
    const [experimentIcon, setExperimentIcon] = useState("/img/icons/svgFlask_2.svg")
    const [gameIcon, setGameIcon] = useState("/img/icons/svgAlien_2.svg")
    const [profileIcon, setProfileIcon] = useState("/img/icons/svgProfile_2.svg")
    const [infoIcon, setInfoIcon] = useState("/img/icons/svgInfo_2.svg")
    const [messageIcon, setMessageIcon] = useState("/img/icons/svgEnvelope_2.svg")
    const [logoutIcon, setLogoutIcon] = useState("/img/icons/svgPower_2.svg")
    const [isMobile, setIsMobile] = useState(false);

    const resetIconStates = (targetIconState:string) => {
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
      console.log(isMobile);
    
 
        if (currentUrl === "/") {
          setGrayscale({...grayscaleObj, grayscale_desktop: 'grayscale(0)'});
          setDesktopIcon("/img/icons/svgDesktop.svg");
          setIconTitle('Desktop');
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
        } else if (currentUrl === "#") {
          handleIconTitle('Information');
          setInfoIcon("/img/icons/svgInfo.svg");
          setGrayscale({...grayscaleObj, grayscale_info: 'grayscale(0)'});
        } else if (currentUrl === "#") {
          handleIconTitle('Messages');
          setLogoutIcon("/img/icons/svgEnvelope.svg");
          setGrayscale({...grayscaleObj, grayscale_message: 'grayscale(0)'});
        } 

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
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Dashboard');
                setDesktopIcon("/img/icons/svgDesktop.svg");
                setGrayscale({...grayscaleObj, grayscale_desktop: 'grayscale(0)'})
                resetIconStates('desktop');
              }}
              >     
              <Link href={{ pathname: "/" }} className={styles.nav_link} style={{filter: `${grayscale.grayscale_desktop}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_desktop}`}
                    src={desktopIcon}
                    alt="SVG Icon"
                    width={50}
                    height={50}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[0] : languageData.eng.navbar[0]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Experiments');
                setExperimentIcon("/img/icons/svgFlask.svg");
                setGrayscale({...grayscaleObj, grayscale_experiment: 'grayscale(0)'})
                resetIconStates('experiment');
                }}
              >
                <Link href={{ pathname: "/experiments" }} className={styles.nav_link}  style={{filter: `${grayscale.grayscale_experiment}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_flask}`}
                    src={experimentIcon}
                    alt="SVG Icon"
                    width={50}
                    height={50}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[1] : languageData.eng.navbar[1]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Games');
                setExperimentIcon("/img/icons/svgAlien.svg");
                setGrayscale({...grayscaleObj, grayscale_game: 'grayscale(0)'})
                resetIconStates('game');
                }}>
                <Link href={{ pathname: "/games" }} className={styles.nav_link} style={{filter: `${grayscale.grayscale_game}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_alien}`}
                    src={gameIcon}
                    alt="SVG Icon"
                    width={50}
                    height={40}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[2] : languageData.eng.navbar[2]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Profile');
                setExperimentIcon("/img/icons/svgProfile.svg");
                setGrayscale({...grayscaleObj, grayscale_profile: 'grayscale(0)'})
                resetIconStates('profile');
                }}>
                <Link href={{ pathname: "/user_form" }} className={styles.nav_link} style={{filter: `${grayscale.grayscale_profile}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_profile}`}
                    src={profileIcon}
                    alt="SVG Icon"
                    width={50}
                    height={40}
                    //style={{ marginLeft: '25px' }}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[3] : languageData.eng.navbar[3]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Information');
                setExperimentIcon("/img/icons/svgInfo.svg");
                setGrayscale({...grayscaleObj, grayscale_info: 'grayscale(0)'})
                resetIconStates('info');
                }}>
                <Link href="#" className={`${styles.nav_link}`} style={{filter: `${grayscale.grayscale_info}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_info}`}
                    src={infoIcon}
                    alt="SVG Icon"
                    width={50}
                    height={50}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[4] : languageData.eng.navbar[4]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Messages');
                setExperimentIcon("/img/icons/svgEnvelope.svg");
                setGrayscale({...grayscaleObj, grayscale_message: 'grayscale(0)'})
                resetIconStates('message');
                }}>
                <Link href="#" className={styles.nav_link} style={{filter: `${grayscale.grayscale_message}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_envelope}`}
                    src={messageIcon}
                    alt="SVG Icon"
                    width={50}
                    height={40}
                  />
                  <span className={styles.link_text}>{language ? languageData.hun.navbar[5] : languageData.eng.navbar[5]}</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Logout');
                setExperimentIcon("/img/icons/svgPower.svg");
                setGrayscale({...grayscaleObj, grayscale_logout: 'grayscale(0)'})
                resetIconStates('logout');
                }}>
                {session && (
                  <Link href="#" className={styles.nav_link} 
                    style={{filter: `${grayscale.grayscale_logout}`}}
                    onClick={(e) => { e.preventDefault(); signOut() }}
                    >
                    <Image
                      className={`${styles.icon_style} ${styles.hover_effect_power}`}
                      src={logoutIcon}
                      alt="SVG Icon"
                      width={45}
                      height={45}
                    />
                    <span className={styles.link_text}>{language ? languageData.hun.navbar[6] : languageData.eng.navbar[6]}</span>
                  </Link>
                )}
              </li>
            </ul>
            </SimpleBar>
          </nav>
          {session && (
          <>
           <div className={styles2.credentials_container}>
            <h4 className={styles2.email}>{session.user?.email}</h4>
          </div>
          <div onClick={() => setLanguage(!language)} className={styles.flag}>
            <div className={styles.flagItem}>
              <p className={language ? styles.flagBorderStyle : styles.flagDefaultStyle}>
                <span className={styles.flagText}>hun</span>
              </p>
              <span style={{scale:'1.1'}} className="fi fi-hu"></span>
            </div>
            <div className={styles.flagItem}>
              <p className={!language ? styles.flagBorderStyle : styles.flagDefaultStyle}>
                <span className={styles.flagText}>eng</span>
              </p>
              <span style={{scale:'1.1'}} className="fi fi-gb"></span>
            </div>
          </div>

          </>
          
        )}

        </div> 
      );
      
}
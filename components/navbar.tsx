import styles from "../styles/Navbar2.module.scss"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react";
import { AppContext } from "./layout"
import {useContext, useState } from "react";
import Image from 'next/image';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; 
import styles2 from "../styles/Index.module.scss"

interface AppContextValue {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
  }

export default function Navbar(){
  
    const { setIsHovered } = useContext(AppContext) as AppContextValue;;
    const { isDarkMode } = useContext(AppContext)  as AppContextValue;
    const { data: session, status } = useSession();

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

    return (
        <div className={styles.main_container}>
          <nav className={styles.mobile_navbar}>
            <div className={styles.mobile_navbar_nav}>
              <h1 className={`${styles.mobile_logo}`}>
                Esport Lab
              </h1>
            </div>
          </nav>
          <div className={styles.iconTitle}>
            <h4>{iconTitle}</h4>
          </div>
          <nav className={styles.navbar} style={isDarkMode ? { filter: "grayscale(100%)" } : {}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SimpleBar  className={styles.scroll_container}  style={{ height: '100%'}}>
            <ul style={{ opacity: '1' }} className={`${styles.navbar_nav} ${!session && status !== 'loading' ? styles.loading : styles.loaded}`}>
              <li className={styles.logo}>
                <Link href={""} className={styles.nav_link_arrow}>
                  <span className={`${styles.link_text} ${styles.logo_text}`}>Esport Lab</span>
                  <Image
                    className={`${styles.icon_style} ${styles.svg_icon} exclude_link`}
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
                  <span className={styles.link_text}>Dashboard</span>
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
                  <span className={styles.link_text}>Experiments</span>
                </Link>
              </li>
      
              <li className={styles.nav_item} onTouchStart={() => {
                handleIconTitle('Games');
                setExperimentIcon("/img/icons/svgAlien.svg");
                setGrayscale({...grayscaleObj, grayscale_game: 'grayscale(0)'})
                resetIconStates('game');
                }}>
                <Link href="#" className={styles.nav_link} style={{filter: `${grayscale.grayscale_game}`}}>
                  <Image
                    className={`${styles.icon_style} ${styles.hover_effect_alien}`}
                    src={gameIcon}
                    alt="SVG Icon"
                    width={50}
                    height={40}
                  />
                  <span className={styles.link_text}>Games</span>
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
                    width={55}
                    height={55}
                    style={{ marginLeft: '25px' }}
                  />
                  <span className={styles.link_text}>Profile</span>
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
                  <span className={styles.link_text}>Information</span>
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
                  <span className={styles.link_text}>Messages</span>
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
                    <span className={styles.link_text}>Logout</span>
                  </Link>
                )}
              </li>
            </ul>
            </SimpleBar>
          </nav>
          {session && (
          <div className={styles2.credentials_container}>
            <h4>{session.user?.name}</h4>
            <h4 className={styles2.email}>{session.user?.email}</h4>
          </div>
        )}
        </div>
      );
      
}
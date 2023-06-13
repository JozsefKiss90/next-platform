import styles from "../styles/Navbar2.module.scss"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react";
import { AppContext } from "./layout"
import {useContext, useState } from "react";
import Image from 'next/image';

interface AppContextValue {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
  }

export default function Navbar(){

    const { setIsHovered } = useContext(AppContext) as AppContextValue;;
    const { isDarkMode } = useContext(AppContext)  as AppContextValue;
    const { data: session, status } = useSession();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return(          
    <>   
    <nav className={styles.navbar} style={isDarkMode ? { filter: "grayscale(100%)" } : {}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ul style={{opacity:'1'}} className={`${styles.navbar_nav} ${!session && status !== 'loading' ? styles.loading : styles.loaded}`}>    
        <li className={styles.logo}>
            <Link  href={""}  className={styles.nav_link_arrow}>
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

        <li className={styles.nav_item}>
            <Link href="#" className={styles.nav_link}>
                <Image
                     className={`${styles.icon_style} ${styles.hover_effect_desktop}`}
                    src="/img/icons/svgDesktop_2.svg"
                    alt="SVG Icon"
                    width={50}
                    height={50}
                />            
                <span className={styles.link_text}>Dashboard</span>
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href={{ pathname:"/experiments"}} className={styles.nav_link}>
                <Image
                    className={`${styles.icon_style} ${styles.hover_effect_flask}`}
                    src="/img/icons/svgFlask_2.svg"
                    alt="SVG Icon"
                    width={50}
                    height={50}
                />            
                <span className={styles.link_text}>Experiments</span>
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href="#" className={styles.nav_link}>
                <Image
                    className={`${styles.icon_style} ${styles.hover_effect_alien}`}
                    src="/img/icons/svgAlien_2.svg"
                    alt="SVG Icon"
                    width={50}
                    height={40}
                    />            
                <span className={styles.link_text}>Games</span>
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href={{ pathname:"/user_form"}} className={styles.nav_link}>
            <Image
                    className={`${styles.icon_style} ${styles.hover_effect_profile}`}
                    src="/img/icons/svgProfile_2.svg"
                    alt="SVG Icon"
                    width={55}
                    height={55}
                    style={{marginLeft: '25px'}}

                />            
                <span className={styles.link_text}>Profile</span>
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href="#" className={`${styles.nav_link}`}>
                <Image
                    className={`${styles.icon_style} ${styles.hover_effect_info}`}
                    src="/img/icons/svgInfo_2.svg"
                    alt="SVG Icon"
                    width={50}
                    height={50}
                    />            
                <span className={styles.link_text}>Information</span>
            </Link>
        </li>

        <li className={styles.nav_item}>
            <Link href="#" className={styles.nav_link}>
                <Image
                    className={`${styles.icon_style} ${styles.hover_effect_envelope}`}
                    src="/img/icons/svgEnvelope_2.svg"
                    alt="SVG Icon"
                    width={50}
                    height={40}
                    />            
                <span className={styles.link_text}>Messages</span>
            </Link>
        </li>

        <li  className={styles.nav_item} id="themeButton">
        {session && (
            <Link href="#" className={styles.nav_link} onClick={(e)=>{e.preventDefault(); signOut()}}>
                <Image
                    className={`${styles.icon_style} ${styles.hover_effect_power}`}
                    src="/img/icons/svgPower_2.svg"
                    alt="SVG Icon"
                    width={45}
                    height={45}
                />            
                <span className={styles.link_text}>Logout</span>
            </Link>
              )}
        </li>
    
        </ul>
    </nav>
    </>
    )
}
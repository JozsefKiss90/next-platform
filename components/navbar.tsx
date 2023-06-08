import styles from "../styles/Navbar2.module.scss"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react";
import { AppContext } from "./layout"
import {useContext, useState } from "react";
import Image from 'next/image';

export default function Navbar(){

    const { setIsHovered } = useContext(AppContext);
    const { data: session, status } = useSession();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return(          
    <>   
    <nav className={styles.navbar}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ul style={{opacity:'1'}} className={`${styles.navbar_nav} ${!session && status !== 'loading' ? styles.loading : styles.loaded}`}>    
        <li className={styles.logo}>
            <Link  href={{ pathname:"/experiments"}}  className={styles.nav_link_arrow}>
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
            <Link href="#" className={styles.nav_link}>
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
                    className={`${styles.icon_style_saturated} ${styles.hover_effect_envelope}`}
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
                    className={styles.icon_style}
                    src="/img/icons/svgPower.svg"
                    alt="SVG Icon"
                    width={40}
                    height={40}
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
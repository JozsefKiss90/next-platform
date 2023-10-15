import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import { AppContext } from "./layout"
import {useContext} from "react"
import Image from 'next/image'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css' 
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { navItems } from "../hooks/navItems"
import {resetIconStates, grayscaleObj, NavbarState } from "../hooks/iconHandler"
import LanguageToggler from './LanguageToggler' 
import { NavAppContextValue } from "../types/types"
export default function Navbar(){
 
  const { setIsHovered, setIsLogin, isDarkMode, languageData, language, setLanguage} = useContext(AppContext) as NavAppContextValue
  const { data: session, status } = useSession() 

  if(session) {
    setIsLogin(true)
  }

  const {
    grayscale,
    iconTitle,
    setExperimentIcon,
    isMobile,
    handleIconTitle,
    setGrayscale,
    iconSetters
} = NavbarState()

const handleReset = (item:any) => {
  resetIconStates(item.titleKey.toLowerCase(), iconSetters)
}

const handleMouseEnter = () => {
  setIsHovered(true)
}

const handleMouseLeave = () => {
  setIsHovered(false)
}
 

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
              handleIconTitle(item.titleKey)
              setExperimentIcon(item.iconPath)
              setGrayscale({ ...grayscaleObj, [item.grayscaleKey]: 'grayscale(0)' })
              handleReset(item)
            }}
          >
          <Link 
            href={{ pathname: item.path }} 
            className={styles.nav_link} 
            style={{ filter: `${grayscale[item.grayscaleKey]}` }}
            onClick={(e) => { 
              item.signOut && (e.preventDefault(), signOut())
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
  )
}
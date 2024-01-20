
import { Session } from "next-auth";
import Navbar from "../components/navbar"
import styles from "../styles/Index.module.scss"
import {getSession} from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Image from "next/image";
import { AppContext } from "../components/layout"
import { useContext} from "react";
import Link from "next/link"

interface UserProps {
  session: Session | null | undefined;
}

interface AppContextValue {
  isHovered: boolean;
  languageData: any
  language: boolean
} 

export default function Home({session} : UserProps) {

  return (
      <>
        {User({ session })}
      </>
  )
} 

function User({ session } : UserProps) {
  const { isHovered, languageData, language} = useContext(AppContext)  as AppContextValue;
  return(
    <div>
    <Navbar/>
    <div className={`${styles.index_container} ${isHovered ? styles.shrink : ""}`}>
      <Image
          className={styles.icon_style_index}
          src="/img/icons/svgAim.svg"
          alt="SVG Icon"
          width={90}
          height={90}  
        />      
        <div className={styles.title_container}> 
          <h1 className={styles.title_text_h1}>ESPORT LAB</h1>
        </div>
        <div className={styles.title_container}>
          <h4 className={styles.title_text_h4}>{language ? languageData.hun.index[0] : "Benchmarking E-sport players through video games"}.</h4>
        </div>
        <div className={styles.task_button_index_container}>
          <Link href="/experiments">
            <button className={styles.task_button_index}>
              <p>{language ? languageData.hun.index[1] :"Experiments"}</p>
            </button>
          </Link> 
          <Link href="/user_form">
            <button className={`${styles.task_button_index} ${styles.second_button}`}>
              <p>{language ? languageData.hun.index[2] : "Profile"}</p>
            </button>
          </Link>
        </div>
    </div>
    </div>
  )
}

export async function getServerSideProps( context: GetServerSidePropsContext)
 : Promise<GetServerSidePropsResult<{ session: Session | null }>>  {
  const session = await getSession(context)
  console.log("SESSION:")
  console.log(session)
  if(!session){ 
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
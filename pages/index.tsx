
import { Session } from "next-auth";
import Navbar from "../components/navbar"
import styles from "../styles/Index.module.scss"
import {getSession} from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Image from "next/image";
import { AppContext } from "../components/layout"
import { useContext} from "react";

interface UserProps {
  session: Session | null | undefined;
}

interface AppContextValue {
  isHovered: boolean;
} 

export default function Home({session} : UserProps) {

  return (
      <>
        {User({ session })}
      </>
  )
} 

function User({ session } : UserProps) {
  const { isHovered } = useContext(AppContext)  as AppContextValue;
  return(
    <div style={{height:'100vh'}}>
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
          <h4 className={styles.title_text_h4}>Benchmarking e-sport players through video games.</h4>
        </div>
        <div className={styles.task_button_index_container}>
          <a href="/experiments">
            <button className={styles.task_button_index}>
              <p>Experiments</p>
            </button>
          </a> 
          <a href="/user_form">
            <button className={`${styles.task_button_index} ${styles.second_button}`}>
              <p>Profile</p>
            </button>
          </a>
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
import Link from "next/link"
import styles from "../styles/Experiments.module.scss"
import { useRouter } from 'next/router'
import {getSession, signIn} from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

export default function Experiments(){

    return (
         <>
          <Navbar/>
         <div className={styles.main}>
            <a href={'/tasks/rtTask'}>
                <h1>
                    Simple Reaction Time Task
                </h1>
            </a>
            <a href={'/tasks/flankerTask'}>
                <h1>
                    Flanker Compatibility Task
                </h1>
            </a> 
        </div>
         </> 
    )
}

export async function getServerSideProps({ req } : any){
    const session = await getSession({ req })
  
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
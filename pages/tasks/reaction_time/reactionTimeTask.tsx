import {useSession, getSession} from "next-auth/react";
import { useEffect, useRef } from 'react';
import { Session } from "next-auth";
import styles from './reactionTime.module.css'

interface TaskProps{
  email: string | undefined; 
  session: Session | null 
}

export default function Page({ taskRef } : any ) {
    console.log(taskRef.ref.taskRef)
    return(
       <div className={styles.container}>
         <div ref={taskRef.ref.taskRef} id="box" className={styles.box}>
            <p>
            Amikor a piros mező zöldre vált, kattints a rá, amilyen gyorsan csak tudsz.
            </p>
            <p>
            Kattints a kezdéshez.
            </p>
         </div>
       </div>
      )
  }



import {useSession, getSession} from "next-auth/react";
import { useEffect, useRef } from 'react';
import { Session } from "next-auth";
import styles from './reactionTime.module.css'

interface TaskProps{
  email: string | undefined; 
  session: Session | null 
}

export default function Page({ email } : TaskProps) {

  const { data: session, status } = useSession();
  const boxRef = useRef(null) 

  useEffect(() => {
    const box = boxRef.current 
    if(box) {
        import('../../taskCollection/reaction_time/reaction_time.js')
          .then((module:any) => {
            module.default(box, email);
          });
      }
    
  }, [boxRef,session]);

  if(session){ 
    console.log("SESSION IS: " + session)
    return(
       <div className={styles.container}>
         <div ref={boxRef} id="box" className={styles.box}>
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
}

export async function getServerSideProps({ req } : any){
  const session = await getSession({ req })
  const email = session?.user?.email || null
  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { email }
  }
}
import {useSession, getSession} from "next-auth/react";
import { useEffect, useRef } from 'react';
import { Session } from "next-auth";
import styles from './simonTask.module.css'

interface TaskProps{
  email: string | undefined; 
}

export default function Page({ email } : TaskProps) {

  const containerRef = useRef(null) 
  const instructionsRef = useRef(null) 
  const buttonRef = useRef(null)  

  useEffect(() => {
    const container = containerRef.current
    const instructions = instructionsRef.current
    const button = buttonRef.current

    if(container && instructions && button) {
        import('../../public/static/simon_task/simonTask.js')
          .then((module:any) => {
            module.default(container,email,instructions,button,styles);
          });
      }
    
  }, [containerRef]);

  return( 
      <div ref={containerRef} id="container" className={styles.container}>
          <div ref={instructionsRef} id="instructions" className={styles.instructions}>
              <p>Press 'A' for "left" and 'L' for "right". Press the start button to begin the task.</p>
          </div>
          <button ref={buttonRef} id="start-button" className={styles.startButton}>Start</button>
      </div>
    )
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
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState, useRef } from 'react'
import styles from './apm.module.css'

interface TaskProps{
  email: string | undefined;
}

export default function ApmTask({ email } : TaskProps ){
  const { data: session, status } = useSession()
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current
    console.log(container)
    if(container) {
      import("../../public/static/apm/apm.js")
        .then((module) => {
          module.default(email, container);
        });
    } 
  }, [containerRef, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } 

  if(session && containerRef){
    return(
      <div id="container" className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
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
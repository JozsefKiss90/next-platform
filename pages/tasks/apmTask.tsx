import { useSession, getSession } from "next-auth/react"
import { useEffect, useState, useRef } from 'react'
import styles from './apm.module.css'

interface TaskProps{
  email: string | undefined;
}

export default function ApmTask({ email } : TaskProps ){
 
  const containerRef = useRef(null);
  //plugins mappa a js fileoknak
  // plugin design pattern
  // useMemo ha sokszor renderelni, higher order functionba berakni  
  //https://react.dev/reference/react/memo, useEffectbe guard 
  //useEffect guard, 1x fusson minden 
  //refactor kisebb komponensekre, i18, 

  useEffect(() => {
    const container = containerRef.current
    console.log(container) 
    if(container) {
      import("../../public/static/apm/apm.js")
        .then((module) => { 
          module.default(email, container);
        });
        //promissal visszakapni a cleanupot, 
    } 
    //cleanup function , a pulginon keresztül, 
  }, [containerRef]);
  // session maradhat ha két komponens van
  // külön componens a session-re, egy másik a játéknak
    return(
      <div id="container" ref={containerRef} className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
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
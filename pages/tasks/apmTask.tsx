import { useSession, getSession } from "next-auth/react"
import { useEffect, useState, useRef } from 'react'
import styles from './apm.module.css'

interface TaskProps{
  email: string | undefined;
}

interface IGamePlugin {
  initialize: (email: string, container: HTMLElement, setDisplayInstruction?: React.Dispatch<React.SetStateAction<boolean>>) => void;
  cleanup?: () => void;
}


export default function ApmTask({ email } : TaskProps ){
 
  const containerRef = useRef(null);
  const displayRef = useRef
  const [displayInstruction, setDisplayInstruction] = useState(true)
  //plugins mappa a js fileoknak
  // plugin design pattern
  // useMemo ha sokszor renderelni, higher order functionba berakni  
  //https://react.dev/reference/react/memo, useEffectbe guard 
  //useEffect guard, 1x fusson minden 
  //refactor kisebb komponensekre, i18, 

  useEffect(() => {
    console.log(displayInstruction);
 }, [displayInstruction]);

  useEffect(() => {
    const container = containerRef.current
    if(container) {
      import("../../public/static/apm/apm.js")
        .then((module) => { 
          module.default(email, container,setDisplayInstruction);
        });
        //promissal visszakapni a cleanupot, 
    } 
    //cleanup function , a pulginon keresztül, 
  }, [containerRef]);
  // session maradhat ha két komponens van
  // külön componens a session-re, egy másik a játéknak

  console.log(displayInstruction)
    return(
    <div className={styles.amp_container}>
    {displayInstruction && 
      <div className={styles.instruction}>
        Kattintsd végig csökkenő sorrendben a  körökön belül lévő számokat,<br /> amilyen gyorsan csak tudod.
      </div>}
     <div id="container" ref={containerRef} className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
      </div> 
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
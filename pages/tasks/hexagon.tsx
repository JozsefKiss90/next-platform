import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import styles from "./hexagon.module.css"
import { useRouter } from 'next/router';

interface TaskProps{
  email: string | undefined;
}

export default function Page({ email } : TaskProps) {
  const router = useRouter();
  
  const handleRedirect = () => {
    router.push('/')
  };
   
  useEffect(() => {
    async function runTask(sessionEmail : string, redirectCallback: () => void) {
      const module = await import('../../public/static/hexagon/modules/hexagon'); 
      let canvas = document.getElementById("canvas");
      let appendTens = document.getElementById("tens");
      let appendSeconds = document.getElementById("seconds");
      let appendMins = document.getElementById("mins");
      let props = {
        canvas : canvas,
        tens : appendTens,
        seconds: appendSeconds,
        mins : appendMins,
      }
      if (!props) {
        await new Promise((resolve) => window.requestAnimationFrame(resolve))
        canvas = document.getElementById('canvas')
        appendTens = document.getElementById("tens");
        appendSeconds = document.getElementById("seconds");
        appendMins = document.getElementById("mins");
        props = {
          canvas : canvas,
          tens : appendTens,
          seconds: appendSeconds,
          mins : appendMins,
        }
      }
      if (props.canvas && props.mins && props.tens && props.seconds) {
        module.default(sessionEmail,redirectCallback, props)
      }
    }
    runTask(email!,handleRedirect); 
  }, []);   
 
  const { data: session, status } = useSession();
  if(session){
    return( 
      <div className={styles.container}>
        <nav className={styles.stopper}>
            <p>Errors: <span id="countErrors">0</span></p>
            <p id="finishTime">Time: <span id="mins">00</span>:<span id="seconds">05</span>:<span id="tens">00</span></p>
        </nav>
        <canvas id="canvas" width="800" height="500" style={{border: '1px solid'}}/>
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


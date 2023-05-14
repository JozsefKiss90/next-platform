import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import styles from "./hexagon.module.css"
import { useRouter } from 'next/router';

export default function Page({ email }) {
  const router = useRouter();
  
  const handleRedirect = () => {
    router.push('/')
  };
  
  useEffect(() => {
    async function runTask(sessionEmail, redirectCallback) {
      const module = await import('../../public/static/hexagon/hexagon/hexagon.js');
      module.default(sessionEmail, redirectCallback);
    }
    runTask(email,handleRedirect);
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


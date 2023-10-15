import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import { Session } from "next-auth";
import styles from "./visualMemory.module.css"

interface TaskProps{
  email: string | undefined; 
  session: Session | null
}

export default function Page({ email } : TaskProps) {

  useEffect(() => {
    async function runTask() {
      const module = await import('../../taskCollection/visual_memory/memory_task.js');
      let grid = document.getElementById("grid");
      let button = document.getElementById("button");
      if (!grid || !button) {
        setTimeout(() => {
          grid = document.getElementById("grid");
          button = document.getElementById("button")
          if (grid && button) {
            module.default(grid,button,styles);
          }
        }, 1000);
      } else {
        module.default(grid,styles);
      }
    }
    runTask()
  }, []);

  const { data: session, status } = useSession();
  if(session){
    console.log("SESSION IS: " + session)
    return(
      <div>
        <h1 style={{color:'white'}}>Visual Working Memory Task</h1>
        <h2 style={{color:'white'}} id="level">Level: 1</h2>
        <div id="grid" className={styles.grid}></div>
        <button  id="button">Start Test</button>
        <p id="status"></p>
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
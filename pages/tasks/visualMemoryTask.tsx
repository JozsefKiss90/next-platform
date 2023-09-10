import {useEffect, useRef, useState} from 'react';
import styles from "./visualMemory.module.css"
import { getSession } from 'next-auth/react';

interface TaskProps{
  email: string | undefined;
}

export default function Page({ email } : TaskProps ) {
  const gridRef = useRef(null);
  const buttonRef = useRef(null);
  const [started, setStarted] = useState(false)
  useEffect(() => { 
    const grid = gridRef.current;
    const button = buttonRef.current; 
    if(grid && button) {
      import('../../public/static/visual_memory/memory_task.js')
        .then((module) => {
          module.default(grid, button, styles);
        });
    }
  }, [gridRef, buttonRef]);
 
  return (
    <div className={styles.container}>
      <h1 style={{color:'white'}}>Visual Working Memory Task</h1>
      <h2 style={{color:'white'}} id="level">Level: 1</h2>
      <div ref={gridRef} id="grid" className={styles.grid}></div>
      {!started && <button ref={buttonRef} className={styles.button} onClick={()=>{setStarted(true)}} id="button">Start Test</button>}
      <p id="status"></p> 
    </div>
  );
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
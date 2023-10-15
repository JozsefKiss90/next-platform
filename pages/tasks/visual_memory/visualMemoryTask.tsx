import { useState} from 'react';
import styles from "./visualMemory.module.css"
import { TaskProps } from '../../../types/types';

export default function Page({ taskRef } : TaskProps  ) {
  
  const [started, setStarted] = useState(false)

  return (
    <div className={styles.container}>
      <h1 style={{color:'white'}}>Visual Working Memory Task</h1>
      <h2 style={{color:'white'}} id="level">Level: 1</h2>
      <div ref={taskRef?.gridRef} id="grid" className={styles.grid}></div>
      {!started && 
      <div style={{display:'flex', alignSelf:'center', flexDirection:'column', position:'relative', top:'30px'}}>
        <h3 style={{color:'white'}}>
          Click on the squares in the order the appear in red.
        </h3>
        <button ref={taskRef?.buttonRef} className={styles.button} onClick={()=>{setStarted(true)}} id="button">
          Start Test
        </button>
      </div>}   
      <p id="status"></p> 
    </div>
  );
}
 

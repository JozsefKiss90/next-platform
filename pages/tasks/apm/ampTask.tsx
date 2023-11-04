import styles from './apm.module.css'
import { TaskProps } from '../../../types/types';


export default function ApmTask({ taskRef } : TaskProps ){

  return (
    <div className={styles.apm_container}> 
      {taskRef?.displayInstruction && 
        <div id="instuction" className={styles.instruction} style={{color:'white'}}>
          Feladat teljesítve!
        </div>}
      <div id="container" ref={taskRef?.containerRef} className={styles.container}>
          <nav className={styles.stopper}>
            <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
          </nav>
        </div> 
     </div>
    )
}


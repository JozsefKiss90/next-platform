import styles from '../apm.module.css'

interface TaskProps {
    email?: string
    taskRef?: any
    setDisplayInstruction?:any
  }

export default function ApmTask({ email, taskRef, setDisplayInstruction } : TaskProps ){

    return (
    <div className={styles.amp_container}>
  
     <div id="container" ref={taskRef} className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
      </div> 
     </div>
    )
}


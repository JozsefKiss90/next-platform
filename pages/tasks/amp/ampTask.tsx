import styles from '../apm.module.css'

interface TaskProps {
    taskRef?: any
  }

export default function ApmTask({ taskRef } : TaskProps ){
    console.log(taskRef)
    return (
    <div className={styles.amp_container}> 
  
     <div id="container" ref={taskRef.ref.taskRef} className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
      </div> 
     </div>
    )
}


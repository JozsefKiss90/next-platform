
import styles from './simonTask.module.css'

interface TaskProps{
  email: string | undefined; 
}

export default function Page({ taskRef } : any ){
  //console.log(taskRef)
  return( 
      <div ref={taskRef.ref.taskRef} id="container" className={styles.container}>
          <div ref={taskRef.ref.instuctionRef} id="instructions" className={styles.instructions}>
              <p>Press 'A' for "left" and 'L' for "right". Press the start button to begin the task.</p>
          </div>
          <button ref={taskRef.ref.buttonRef} id="start-button" className={styles.startButton}>Start</button>
      </div>
    )
}



import styles from './simonTask.module.css'
import { TaskProps } from '../../../types/types';

export default function Page({ taskRef } : TaskProps ){
  return( 
      <div ref={taskRef?.containerRef} id="container" className={styles.container}>
          <div ref={taskRef?.instructionRef} id="instructions" className={styles.instructions}>
              <p>Press 'A' for "left" and 'L' for "right". Press the start button to begin the task.</p>
          </div>
          <button ref={taskRef?.buttonRef} id="start-button" className={styles.startButton}>Start</button>
      </div>
    )
}


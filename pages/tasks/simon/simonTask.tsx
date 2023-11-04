
import styles from './simonTask.module.css'
import { TaskProps } from '../../../types/types';

export default function Page({ taskRef } : TaskProps ){
    console.log(taskRef)
    return(   
      <div ref={taskRef?.containerRef} id="container" className={styles.container}>
          <div ref={taskRef?.instructionRef} id="instructions" className={styles.instructions}>
              <p>A feladatban a 'bal' és 'jobb' szavakra kell egy billenytű gomb lenyomásával válaszolnod.</p>
              <p>Nyomd meg az 'A' gombot ha a "bal" szót látod, az 'L' gombot ha a 'jobb'-at.</p>
              <p>Kattints a 'Start' gombra a feladat kezdéséhez.</p>

          </div>
          <button ref={taskRef?.buttonRef} id="start-button" className={styles.startButton}>Start</button>
      </div>
    )
}


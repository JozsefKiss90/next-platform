import styles from './reactionTime.module.css'
import { TaskProps } from '../../../types/types';

export default function Page({ taskRef } : TaskProps ) {
   console.log(taskRef)
    return(
       <div className={styles.container}> 
         <div ref={taskRef?.containerRef} id="box" className={styles.box}>
            <p>
            Amikor a piros mező zöldre vált, kattints a rá, amilyen gyorsan csak tudsz.
            </p>
            <p>
            Kattints a kezdéshez.
            </p>
         </div>
       </div>
      )
  }



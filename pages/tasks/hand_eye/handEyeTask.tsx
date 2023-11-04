import styles from "./handEye.module.css";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type RefObject = {
  containerRef: MutableRefObject<any>
  buttonRef: MutableRefObject<any>
  instructionRef: MutableRefObject<any>
  gridRef: MutableRefObject<any>
  setStarted: Dispatch<SetStateAction<boolean>>
  started: boolean
  displayInstruction: boolean
} 
interface TaskProps {
  email?: string
  taskRef?: RefObject | undefined
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>> 
} 

export default function HandEye({ taskRef}: TaskProps) {
  console.log(taskRef)
  return (
    <div className={styles.container_3}>
      <div id="container-2" className={styles.container_2}>

      <div className={styles.countdown} id="countdown"></div>
      <div ref={taskRef?.containerRef} id="trials" className={styles.trials}></div>
      <div id="container" className={styles.container}>
        <div className={styles.lineX}></div>
        <div className={styles.lineY}></div>
        <div className={styles.aim_circle}></div>
        <div id="moveMeX" className={styles.circleX}></div>
        <div id="moveMeY" className={styles.circleY}></div>
      </div>
      </div>
    </div>
  );
}

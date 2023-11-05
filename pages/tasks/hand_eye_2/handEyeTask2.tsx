import styles from "./handEye.module.css";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

type RefObject = {
  containerRef: MutableRefObject<any>
  instructionRef: MutableRefObject<any>
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
  return (
    <div className={styles.container} id="canvas-container">
          <canvas ref={taskRef?.containerRef} id="container" width="1000" height="600"></canvas>
      </div>
  );
}

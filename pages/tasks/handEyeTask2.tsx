import styles from "./handEye.module.css";
import { useRef } from "react";

interface TaskProps {
  email?: string;
  trialsRef?: any;
}

export default function HandEye({ email, trialsRef }: TaskProps) {
  return (
    <div id="container-2" className={styles.container_2}>
      <div className={styles.textElement}>
        Kattints a zöld területre, hogy a mozgó körök megálljanak. Próbáld a
        középponthoz minnél közelebb megállítani őket.{" "}
      </div>
      <div className={styles.countdown} id="countdown"></div>
      <div ref={trialsRef} id="trials" className={styles.trials}></div>
      <div id="container" className={styles.container}>
        <div className={styles.lineX}></div>
        <div className={styles.lineY}></div>
        <div className={styles.aim_circle}></div>
        <div id="moveMeX" className={styles.circleX}></div>
        <div id="moveMeY" className={styles.circleY}></div>
      </div>
    </div>
  );
}

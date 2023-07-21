import { useState, useEffect } from "react";
import styles from "../styles/ProgressBar.module.scss";

interface ProgressProps {
  completed : number
}

export default function ProgressBar({ completed } : ProgressProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(completed);
  }, [completed]);

  return (
    <div className={styles.container}>
      <div className={styles.container__progressbars}>
        <div className={styles.progressbar}>
          <svg className={styles.progressbar__svg}>
            <circle cx="50" cy="50" r="20" className={`${styles["progressbar__svg-circle"]} ${styles["circle-html"]} ${styles["shadow-html"]}`}></circle>
          </svg>
          <span className={`${styles.progressbar__text} ${styles["shadow-html"]}`}>99</span>
        </div>
      </div>
    </div>
  );
}

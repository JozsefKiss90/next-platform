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

  const fillerWidth = {
    width: `${width}%`
  }; 
  
  return (
    <div className={styles.container}>
      <div className={styles.filler_styles} style={fillerWidth}>
        <span className={styles.label_styles}></span>
      </div>
      <div className={styles.progress_text}>
        {`${width}%`}
      </div>
    </div>
  );
}
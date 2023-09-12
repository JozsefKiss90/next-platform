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

  
  const filterColor = {
    filter: width > 80 ? 'drop-shadow(0 0 6px rgb(0, 245, 33))' : width < 80 && width > 40 ? 'drop-shadow(0 0 6px rgb(223, 255, 80))'
     : 'drop-shadow(0 0 6px rgb(213, 5, 2))'
  }; 

  const fillerWidth = {
    width: `${width}%`,
    backgroundColor: width > 80 ? 'rgb(0, 245, 33)' : width < 80 && width > 40 ? 'rgb(225, 245, 0)' : 'rgb(213, 5, 2)'
  }; 

  const labelColor = {
    color: width <=55 ? 'rgb(120, 120, 120)' : 'white'
  }; 
  
  return (
    <div className={styles.container} style={filterColor}>
      <div className={styles.filler_styles} style={fillerWidth}>
        <span className={styles.label_styles}></span>
      </div>
      <div className={styles.progress_text} style={labelColor} >
        {`${width}%`}
      </div>
    </div>
  );
}
import {useEffect, useRef} from 'react';
import Script from 'next/script'
import styles from "./visualMemory.module.css"

export default function Page() {
  const gridRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const button = buttonRef.current;
    if(grid && button) {
      import('../../public/static/visual_memory/memory_task.js')
        .then((module) => {
          module.default(grid, button, styles);
        });
    }
  }, [gridRef, buttonRef]);
  
  return (
    <div>
      <h1 style={{color:'white'}}>Visual Working Memory Task</h1>
      <h2 style={{color:'white'}} id="level">Level: 1</h2>
      <div ref={gridRef} id="grid" className={styles.grid}></div>
      <button ref={buttonRef} id="button">Start Test</button>
      <p id="status"></p>
    </div>
  );
}



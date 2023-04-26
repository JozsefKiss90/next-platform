import { useEffect } from 'react';
import 'jspsych/css/jspsych.css'

export default function Flanker() {

  useEffect(() => {
    async function runTask() {
      const module = await import('../../public/static/flanker.js');
      module.default();
    }
    runTask();
  }, []);

  return (
  <div>
  </div>
  )
} 

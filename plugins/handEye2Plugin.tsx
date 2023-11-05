import runTask from "../taskCollection/hand_eye_2/handEye2"
import { IGamePlugin } from "../types/types"
import styles from '../pages/tasks/hand_eye_2/handEye.module.css'

const handEyePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        const task = runTask(email, refObj.containerRef.current, styles);
        const cleanup = () => {
           // clearInterval(task); 

        }; 
        return cleanup;
    },
}

export default handEyePlugin

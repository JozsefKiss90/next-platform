import runTask from "../taskCollection/hand_eye/handEye"
import { IGamePlugin } from "../types/types"
import styles from '../pages/tasks/hand_eye/handEye.module.css'

const handEyePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        const myIntervalX = runTask(email, refObj, styles); 
        const cleanup = () => {
            clearInterval(myIntervalX); 

        }; 
        return cleanup;
    },
}

export default handEyePlugin

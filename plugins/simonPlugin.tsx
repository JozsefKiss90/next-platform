import runTask from "../taskCollection/simon_task/simonTask"
import styles from '../pages/tasks/simon/simonTask.module.css'
import { IGamePlugin } from "../types/types"

const ampPlugin: IGamePlugin = {
    initialize: (email,refObj) => {
        runTask(
            email, 
            refObj.containerRef.current,
            refObj.instructionRef.current,
            refObj.buttonRef.current,
            styles)
        return () => {
           
        }
    },
}

export default ampPlugin

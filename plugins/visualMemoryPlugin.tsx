import runTask from "../taskCollection/visual_memory/memory_task"
import styles from '../pages/tasks/visual_memory/visualMemory.module.css'
import { IGamePlugin } from "../types/types"

const ampPlugin: IGamePlugin = {
    initialize: (email,refObj) => {
        runTask(
            refObj.gridRef.current,
            refObj.buttonRef.current,
            styles,
            email
            ) 
        return () => {
           
        }
    },
}

export default ampPlugin


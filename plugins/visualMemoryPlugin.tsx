import runTask from "../public/static/visual_memory/memory_task"
import styles from '../pages/tasks/visual_memory/visualMemory.module.css'

interface IGamePlugin {
    initialize: (
        email: string,
        refObj: any,
        displayInstruction?: any
    ) => void | (() => void)
    cleanup?: () => void
}


const ampPlugin: IGamePlugin = {
    initialize: (email,refObj) => {
        runTask(
            refObj.ref.gridRef.current,
            refObj.ref.buttonRef.current,
            styles)
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default ampPlugin


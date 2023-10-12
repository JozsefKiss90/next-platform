import runTask from "../public/static/simon_task/simonTask"
import styles from '../pages/tasks/simon/simonTask.module.css'

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
            email, 
            refObj.ref.taskRef.current,
            refObj.ref.instuctionRef.current,
            refObj.ref.buttonRef.current,
            styles)
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default ampPlugin

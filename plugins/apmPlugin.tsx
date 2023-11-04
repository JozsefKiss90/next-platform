import runTask from "../taskCollection/apm/apm"
import { IGamePlugin } from "../types/types"
import styles from '../pages/tasks/hand_eye/handEye.module.css'

const ampPlugin: IGamePlugin = { 
    initialize: (email, refObj, displayInstruction) => {
        runTask(email, refObj.containerRef.current,displayInstruction, styles)
        return () => { 
           
        }
    },
}

export default ampPlugin

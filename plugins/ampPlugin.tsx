import runTask from "../public/static/taskCollection/apm/apm"
import { IGamePlugin } from "../types/types"

const ampPlugin: IGamePlugin = { 
    initialize: (email, refObj, displayInstruction) => {
        runTask(email, refObj.containerRef.current,displayInstruction)
        return () => {
           
        }
    },
}

export default ampPlugin

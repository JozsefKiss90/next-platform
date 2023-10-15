import runTask from "../taskCollection/apm/apm"
import { IGamePlugin } from "../types/types"

const ampPlugin: IGamePlugin = { 
    initialize: (email, refObj, displayInstruction) => {
        runTask(email, refObj.containerRef.current,displayInstruction)
        return () => {
           
        }
    },
}

export default ampPlugin

import runTask from "../public/static/apm/apm"
interface IGamePlugin {
    initialize: (
        email: string,
        refObj: any,
        displayInstruction?: any
    ) => void | (() => void)
    cleanup?: () => void
}

const ampPlugin: IGamePlugin = {
    initialize: (email, refObj, displayInstruction) => {
        runTask(email, refObj.ref.taskRef.current,displayInstruction)
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default ampPlugin

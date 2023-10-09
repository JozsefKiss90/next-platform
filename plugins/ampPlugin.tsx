import runTask from "../public/static/apm/apm"
interface IGamePlugin {
    initialize: (
        email: string,
        container: HTMLElement,
        displayInstruction?: any
    ) => void | (() => void)
    cleanup?: () => void
}

const ampPlugin: IGamePlugin = {
    initialize: (email, container,displayInstruction) => {
        runTask(email, container,displayInstruction)
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default ampPlugin

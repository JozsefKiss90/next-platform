import runTask from "../public/static/hand_eye/handEye"

interface IGamePlugin {
    initialize: (
        email: string,
        trials: HTMLElement,
        displayInstruction?: any
    ) => void | (() => void)
    cleanup?: () => void
}

const handEyePlugin: IGamePlugin = {
    initialize: (email, trials) => {
        runTask(email, trials)
     
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default handEyePlugin

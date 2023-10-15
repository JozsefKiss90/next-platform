import runTask from "../public/static/reaction_time/reaction_time"
interface IGamePlugin {
    initialize: (
        email: string,
        refObj: any,
        displayInstruction?: any
    ) => void | (() => void)
    cleanup?: () => void
}

const reactionTimePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        runTask(email, refObj.ref.taskRef.current)
        return () => {
           
        }
    },
    cleanup: () => {
   
    }
}

export default reactionTimePlugin

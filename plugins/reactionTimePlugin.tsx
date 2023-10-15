import runTask from "../taskCollection/reaction_time/reaction_time"
import { IGamePlugin } from "../types/types"

const reactionTimePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        runTask(email, refObj.containerRef.current)
        return () => {
           
        }
    }
}

export default reactionTimePlugin

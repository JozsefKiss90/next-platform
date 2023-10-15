import runTask from "../taskCollection/hand_eye/handEye"
import { IGamePlugin } from "../types/types"


const handEyePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        const myIntervalX = runTask(email, refObj);
        const cleanup = () => {
            clearInterval(myIntervalX); 

        }; 
        return cleanup;
    },
}

export default handEyePlugin

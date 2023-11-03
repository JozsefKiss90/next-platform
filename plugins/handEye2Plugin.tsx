import runTask from "../taskCollection/hand_eye_2/handEye2"
import { IGamePlugin } from "../types/types"


const handEyePlugin: IGamePlugin = {
    initialize: (email, refObj) => {
        const task = runTask(email, refObj.containerRef.current);
        const cleanup = () => {
           // clearInterval(task); 

        }; 
        return cleanup;
    },
}

export default handEyePlugin

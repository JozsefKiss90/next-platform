import runTask from "../public/static/hand_eye/handEye";



interface IGamePlugin {
    initialize: (
        email: string,
        container: HTMLElement,
        setDisplayInstruction?: React.Dispatch<React.SetStateAction<boolean>>
    ) => void | (() => void);
    cleanup?: () => void;
}

const handEyePlugin: IGamePlugin = {
    initialize: (email, container, setDisplayInstruction) => {
        runTask(container, email);
     
        return () => {
           
        };
    },
    cleanup: () => {
   
    }
};

export default handEyePlugin;

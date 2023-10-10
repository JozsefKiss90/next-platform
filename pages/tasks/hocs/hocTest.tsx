import { useSession } from "next-auth/react";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

interface IGamePlugin {
  initialize: (
      email: string,
      container: HTMLElement,
      displayInstruction?: Dispatch<SetStateAction<boolean>>
  ) => void | (() => void)
  cleanup?: () => void
}

interface TaskProps {
  email?: string
  taskRef?:  MutableRefObject<null>
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>>
}

export default function withSessionTask(plugin:IGamePlugin, WrappedComponent:React.FC<TaskProps>) {
  return function SessionTaskComponent(props:TaskProps) {
      const taskRef = useRef(null);
      const { data: session } = useSession();
      const [displayInstruction, setDisplayInstruction] = useState<boolean>(true);
      
      useEffect(() => {
          const task = taskRef.current;
          console.log(task)
          if (props.email && task && session) {
              const cleanup = plugin.initialize(props.email, task, setDisplayInstruction);
              return () => {
                  cleanup && cleanup();
              };
          }
      }, [session, props.email]);

      return <WrappedComponent {...props} taskRef={taskRef} setDisplayInstruction={setDisplayInstruction} />;
  };
}

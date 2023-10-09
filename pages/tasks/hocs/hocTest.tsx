import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function withSessionTask(plugin:any) {
  return function (WrappedComponent:any) {
    return function SessionTaskComponent(props:any) {
      console.log('SessionTaskComponent is rendering');
      const taskRef = useRef(null);
      const { data: session } = useSession();
      const [displayInstruction, setDisplayInstruction] = useState(true)
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
  };
}

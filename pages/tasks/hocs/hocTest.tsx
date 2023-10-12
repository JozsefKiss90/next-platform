import { useSession } from "next-auth/react"
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react"

interface IGamePlugin {
  initialize: (
      email: string,
      container: any,
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
    const taskRef = useRef(null)
    const buttonRef = useRef(null)
    const instuctionRef = useRef(null)
    const refObj = {
      ref:{
        taskRef,
        buttonRef,
        instuctionRef,
      }
    }
    const { data: session } = useSession()
    const [displayInstruction, setDisplayInstruction] = useState<boolean>(true)

    useEffect(() => {
        const task = refObj
        if (props.email && task.ref.taskRef !=null && session) {
          console.log(task)
            const cleanup = plugin.initialize(props.email, task, setDisplayInstruction)
            return () => {
                cleanup && cleanup()
            }
        }
      }, [session, props.email, refObj])

      return <WrappedComponent {...props} taskRef={refObj} setDisplayInstruction={setDisplayInstruction} />
  }
}

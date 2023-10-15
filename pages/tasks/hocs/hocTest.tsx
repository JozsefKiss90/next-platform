import { useSession } from "next-auth/react"
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState, useMemo } from "react"

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
    const gridRef = useRef(null)

    const { data: session } = useSession()
    const [displayInstruction, setDisplayInstruction] = useState<boolean>(true)
    const [started, setStarted] = useState(false)

    const refObj = {
      ref:{
        taskRef,
        buttonRef,
        instuctionRef,
        gridRef,
        setStarted,
        started
      }
    }

    useEffect(() => {
        const task = refObj
        if (props.email && task.ref.taskRef !=null && session) {
            const cleanup = plugin.initialize(props.email, task, setDisplayInstruction)
            return () => {
                cleanup && cleanup()
            }
        }
      }, [session, props.email])

      return <WrappedComponent {...props} taskRef={refObj} setDisplayInstruction={setDisplayInstruction} />
  }
}

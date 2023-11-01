import { useSession } from "next-auth/react"
import {useEffect, useRef, useState } from "react"
import { RefObject, IGamePlugin, TaskProps } from "../types/types"

export default function withSessionTask(plugin: IGamePlugin, ComponentWrapper: React.FC<TaskProps>) {
  return function SessionTaskComponent(props: TaskProps) {
    const containerRef = useRef(null) 
    const buttonRef = useRef(null)
    const instructionRef = useRef(null) 
    const gridRef = useRef(null) 

    const { data: session } = useSession()
    const [displayInstruction, setDisplayInstruction] = useState<boolean>(true)
    const [started, setStarted] = useState(false)

    const refObj: RefObject = {
      containerRef,
      buttonRef,
      instructionRef,
      gridRef,
      setStarted,
      started,
      displayInstruction,
    }

    useEffect(() => {
      const task = refObj
      console.log(refObj)
      if (props.email && task.containerRef !== null && session) {
        const cleanup = plugin.initialize(props.email, task, setDisplayInstruction)
        return () => {
          cleanup && cleanup()
        }
      }
    }, [session, props.email])  

    return <ComponentWrapper {...props} taskRef={refObj} setDisplayInstruction={setDisplayInstruction} />
  } 
}
import { useSession, getSession } from "next-auth/react"
import { useEffect, useRef } from 'react'
import styles from "./hexagon.module.css"
import { useRouter } from 'next/router'

interface TaskProps  {
  email: string | undefined
}

export default function Page({ email }: TaskProps) {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/')
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appendTensRef = useRef<HTMLSpanElement>(null)
  const appendSecondsRef = useRef<HTMLSpanElement>(null)
  const appendMinsRef = useRef<HTMLSpanElement>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    async function runTask(sessionEmail: string, redirectCallback: () => void) {
      if (!canvasRef.current || !appendTensRef.current || !appendSecondsRef.current || !appendMinsRef.current) return

      const module = await import('../../../public/static/hexagon/modules/hexagon')
      const hexagonModule = module.default 

      const props = {
        canvas: canvasRef.current,
        tens: appendTensRef.current,
        seconds: appendSecondsRef.current,
        mins: appendMinsRef.current,
      } 

      hexagonModule(sessionEmail, redirectCallback, props)
    }

    if (session) {
      runTask(email!, handleRedirect)
    }
  }, [session, canvasRef])

  if (status === 'loading') {
    return <div>Loading...</div>
  } 

  if(session) {  
    return (
      <div className={styles.container}>
        <nav className={styles.stopper}>
          <p>Errors: <span id="countErrors">0</span></p>
          <p id="finishTime">Time: <span ref={appendMinsRef}>05</span>:<span ref={appendSecondsRef}>00</span>:<span ref={appendTensRef}>00</span></p>
        </nav>
        <canvas id="canvas" ref={canvasRef} width="800" height="500" style={{ border: '1px solid' }} />
      </div>
    )
  }

  return null
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })
  const email = session?.user?.email || null

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { email }
  }
}

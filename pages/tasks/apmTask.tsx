import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import styles from './apm.module.css'

export default function ApmTask({ email }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runTask(sessionEmail) {
      const module = await import('../../public/static/apm/apm.js')
      let containerProp = document.getElementById('container')
      if (!containerProp) {
        await new Promise((resolve) => window.requestAnimationFrame(resolve))
        containerProp = document.getElementById('container')
      }
      if (containerProp) {
        module.default(sessionEmail, containerProp)
      }
    }
    runTask(email)
  }, [])

  const { data: session, status } = useSession()
  if(session ){
    return(
      <div id="container" className={styles.container}>
        <nav className={styles.stopper}>
          <p id="finishTime"><span id="mins">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        </nav>
      </div>
    )
  }
}

export async function getServerSideProps({ req } : any){
  const session = await getSession({ req })
  const email = session?.user?.email || null
  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { email }
  }

}

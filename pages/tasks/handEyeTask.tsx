import { useSession, getSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import styles from "./handEye.module.css"

interface TaskProps{
  email: string | undefined;
}

export default function HandEye({ email } : TaskProps) {
  const trialsRef = useRef(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    const trials = trialsRef.current; 
    if(trials) {
      import("../../public/static/hand_eye/handEye.js")
        .then((module) => {
          module.default(trials, email);
        });
    }
  }, [session]);

  if (session) {
    return (
      <div id="container-2" className={styles.container_2}>
        <div className={styles.textElement}>
          Kattints a zöld területre, hogy a mozgó körök megálljanak. Próbáld a
          középponthoz minnél közelebb megállítani őket.{" "}
        </div>
        <div className={styles.countdown} id="countdown"></div>
        <div ref={trialsRef} id="trials" className={styles.trials}></div>
            <div id="container" className={styles.container}>
            <div className={styles.lineX}></div>
            <div className={styles.lineY}></div>
            <div className={styles.aim_circle}></div>
            <div id="moveMeX" className={styles.circleX}></div>
            <div id="moveMeY" className={styles.circleY}></div>
          </div>
      </div>
    )
  }
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })
  const email = session?.user?.email || null
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { email },
  }
}

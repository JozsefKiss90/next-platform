import { useSession, getSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import styles from "./hand_eye/handEye.module.css";
import handEyePlugin from "../../plugins/handEyePlugin";

interface TaskProps{
  email?: string;
}

export default function HandEye({email} : TaskProps) {
  const trialsRef = useRef(null);
  const { data: session } = useSession();

  useEffect(() => {
    const trials = trialsRef.current;

    if (email && trials && session) {
      const cleanup = handEyePlugin.initialize(email, trials);
      return () => {
        cleanup && cleanup();
      };
    }
  }, [session, email]);

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
    );
  }

  // Optional: Display something (e.g., a loader) when session data is not available yet
  return null;
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  const email = session?.user?.email || null;
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { email },
  };
}

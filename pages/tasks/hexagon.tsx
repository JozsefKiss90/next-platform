import { useSession, getSession } from "next-auth/react";
import { useEffect, useRef } from 'react';
import styles from "./hexagon.module.css";
import { useRouter } from 'next/router';

interface TaskProps {
  email: string | undefined;
}

export default function Page({ email }: TaskProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appendTensRef = useRef<HTMLSpanElement>(null);
  const appendSecondsRef = useRef<HTMLSpanElement>(null);
  const appendMinsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function runTask(sessionEmail: string, redirectCallback: () => void) {
      const script = document.createElement('script');
      script.src = '/static/hexagon/modules/hexagon.js';
      script.async = true;

      script.onload = () => {
        const hexagonModule = (window as any).runTask; // Assuming the hexagon module exports the runTask function globally

        let canvas = canvasRef.current;
        let appendTens = appendTensRef.current;
        let appendSeconds = appendSecondsRef.current;
        let appendMins = appendMinsRef.current;

        let props = {
          canvas,
          tens: appendTens,
          seconds: appendSeconds,
          mins: appendMins,
        };

        if (props.canvas && props.mins && props.tens && props.seconds) {
          hexagonModule(sessionEmail, redirectCallback, props);
        }
      };

      document.body.appendChild(script);
    }

    runTask(email!, handleRedirect);
  }, []);

  const { data: session, status } = useSession();
  if (session) {
    return (
      <div className={styles.container}>
        <nav className={styles.stopper}>
          <p>Errors: <span id="countErrors">0</span></p>
          <p id="finishTime">Time: <span ref={appendMinsRef}>00</span>:<span ref={appendSecondsRef}>05</span>:<span ref={appendTensRef}>00</span></p>
        </nav>
        <canvas id="canvas" ref={canvasRef} width="800" height="500" style={{ border: '1px solid' }} />
      </div>
    );
  }

  return null; // Return null or other fallback UI when session is not available
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
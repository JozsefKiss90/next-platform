import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProgressBar from "../components/progressBar";
import { Session, User } from "next-auth";

interface UserData {
  email: string;
  taskName: string;
  taskResult: number; 
}

interface UserProps {
  session: Session | null | undefined;
}

export default function Experiments({ session }: UserProps) {
  const [taskData, setTaskData] = useState<UserData[] | undefined>();
  const [userData, setUserData] = useState<UserData[] | undefined>();
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    fetch('/api/rt')
      .then(res => res.json())
      .then(data => setTaskData(data.data))
      .catch(err => console.log(err)) 
  }, []);

  useEffect(() => {
    if (taskData !== undefined && session?.user?.email) {
      const userTaskData = taskData.filter((data: UserData) => data.email === session?.user?.email);
      setUserData(userTaskData);
    }
  }, [taskData, session?.user?.email]);

  console.log(taskData)
  console.log(userData)
  
  useEffect(() => {
    if (userData !== undefined) {
      switch (userData.length) {
        case 1:
          setCompleted(33);
          break;
        case 2:
          setCompleted(66);
          break;
        case 3:
          setCompleted(100);
          break;
        default:
          setCompleted(0);
          break;
      }
    }
  }, [userData]);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className="task">
          <a href={'/tasks/rtTask'}>
            <h1>Simple Reaction Time Task</h1>
          </a>
          <ProgressBar completed={completed} />
        </div>
        <div className="task">
          <a href={'/tasks/flankerTask'}>
            <h1>Flanker Compatibility Task</h1>
          </a> 
          <ProgressBar completed={completed} />
        </div>
        <div className="task">
          <a href={'/tasks/networkTask'}>
            <h1>Attention Network Task</h1>
          </a>  
          <ProgressBar completed={completed} />
        </div>
        <div className="task">
          <a href={'/tasks/apmTask'}>
            <h1>Action Per Minute Task</h1>
          </a>  
          <ProgressBar completed={completed} />
        </div>
      </div>
    </> 
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
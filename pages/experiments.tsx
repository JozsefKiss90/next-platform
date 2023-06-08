import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProgressBar from "../components/progressBar";
import { Session, User } from "next-auth";
import { AppContext } from "../components/layout"
import {useContext } from "react";
import Image from 'next/image';

interface UserData {
  email: string;
  taskName: string;
  taskResult: number; 
}

interface UserProps {
  session: Session | null | undefined;
}

interface AppContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Experiments({ session }: UserProps) {

  const { isHovered } = useContext(AppContext)  as AppContextValue;;

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
    <div>
      <Navbar />
      <div className={`${styles.main} ${isHovered ? styles.shrink : ""}`}>
        <div className={styles.task}>
          <a href={'/tasks/rtTask'}>
            <h2>Reaction Time</h2>
          </a>
          <Image
              className={styles.icon_style}
              src="/img/icons/svgLightning.svg"
              alt="SVG Icon"
              width={60}
              height={60}
            />      
          <ProgressBar completed={30} />
          <button className={styles.task_button}>
                <p>
                  Start
                </p>
            </button>
        </div>
        <div className={styles.task}>
          <a href={'/tasks/flankerTask'}>
            <h1>Flanker Compatibility Task</h1>
          </a> 
          <ProgressBar completed={completed} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/networkTask'}>
            <h1>Attention Network Task</h1>
          </a>  
          <ProgressBar completed={completed} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/apmTask'}>
            <h1>Action Per Minute Task</h1>
          </a>  
          <ProgressBar completed={completed} />
        </div>
      </div>
    </div> 
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

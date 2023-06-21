import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect,useContext } from "react";
import Navbar from "../components/navbar";
import ProgressBar from "../components/progressBar";
import { Session, User } from "next-auth";
import { AppContext } from "../components/layout"
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Experiments({ session }: UserProps) {

  const { isHovered } = useContext(AppContext)  as AppContextValue;
 
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
        case 2:
          setCompleted(33);
          break;
        case 2:
          setCompleted(66);
          break;
        case 3:
          setCompleted(200);
          break;
        default:
          setCompleted(0);
          break;
      }
    } 
  }, [userData]);

  let slideStyle: React.CSSProperties = {

    display: 'block',
    marginTop: '100px'
  }

  return ( 
    <>
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
            <a href={'/tasks/rtTask'}>
              <button className={styles.task_button}>
                <p>
                  Start
                </p>
              </button>
            </a>
          <ProgressBar completed={90} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/flankerTask'}>
            <h2>Flanker Task</h2>
          </a> 
           <Image
              className={styles.icon_style_flanker}
              src="/img/icons/svgFlanker.svg"
              alt="SVG Icon"
              width={100}
              height={80}
            />      
            <a href={'/tasks/flankerTask'}>
              <button className={styles.task_button}>
                <p>
                  Start
                </p>
              </button>
            </a>
          <ProgressBar completed={90} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/networkTask'}>
            <h2>Attentional Networks</h2>
          </a>  
            <Image
              className={styles.icon_style}
              src="/img/icons/svgArrow.svg"
              alt="SVG Icon"
              width={200}
              height={60}
            />      
            <a href={'/tasks/networkTask'}>
              <button className={styles.task_button}>
                <p>
                  Start
                </p>
              </button>
            </a>
          <ProgressBar completed={90} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/apmTask'}>
            <h2>Action Per Minute</h2>
          </a>  
          <h1 className={`${styles.amp_style} ${styles.icon_style}`}>
            AMP 
          </h1>
            <a href={'/tasks/apmTask'}>
            <button className={styles.task_button}>
                <p>
                  Start
                </p>
            </button>
            </a>
          <ProgressBar completed={90} />
        </div>
        <div className={styles.task}>
          <a href={'/tasks/handEyeTask'}>
            <h2>Hand Eye Coordination</h2>
          </a>  
          <Image
              className={styles.icon_style}
              src="/img/icons/svgAim.svg"
              alt="SVG Icon"
              width={60}
              height={60}
            />      
         <a href={'/tasks/handEyeTask'}>
          <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
         </a>
          <ProgressBar completed={90} />
        </div>
      </div>
      <div style={{...slideStyle}}>
      <Carousel showStatus={false} className={styles.container_mobile}>
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
            <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
            <ProgressBar completed={90} />
          </div>
          <div className={styles.task}>
            <a href={'/tasks/flankerTask'}>
              <h2>Flanker Task</h2>
            </a> 
            <Image
                className={styles.icon_style_flanker}
                src="/img/icons/svgFlanker.svg"
                alt="SVG Icon"
                width={100}
                height={80}
              />      
            <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
            <ProgressBar completed={90} />
          </div>
          <div className={styles.task}>
            <a href={'/tasks/networkTask'}>
              <h2>Attentional Networks</h2>
            </a>  
            <Image
                className={styles.icon_style}
                src="/img/icons/svgArrow.svg"
                alt="SVG Icon"
                width={200}
                height={60}
              />      
            <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
            <ProgressBar completed={90} />
          </div>
          <div className={styles.task}>
            <a href={'/tasks/apmTask'}>
              <h2>Action Per Minute</h2>
            </a>  
            <h1 className={`${styles.amp_style} ${styles.icon_style}`}>
              AMP 
            </h1>
            <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
            <ProgressBar completed={90} />
          </div>
          <div className={styles.task}>
            <a href={'/tasks/apmTask'}>
              <h2>Hand Eye Coordination</h2>
            </a>  
            <Image
                className={styles.icon_style}
                src="/img/icons/svgAim.svg"
                alt="SVG Icon"
                width={60}
                height={60}
              />      
            <button className={styles.task_button}>
              <p>
                Start
              </p>
            </button>
            <ProgressBar completed={90} />
          </div>
      </Carousel>
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

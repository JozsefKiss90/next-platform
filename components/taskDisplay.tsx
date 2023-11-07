
import styles from "../styles/Experiments.module.scss";
import Link from 'next/link';
import ProgressBar from "./progressBar";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Session } from "next-auth";

type TaskData = {
  name: string;
  link: string;
  imgSrc?: string;
  imgWidth?: number;
  imgHeight?: number;
  specialH1?: string;
  specialH1Class?: string;
  endpoint: string;
};

type TaskDisplayProps = {
  isHovered: boolean;
  disableLink: boolean;
  language: boolean;
  languageData: {
    hun: {
      experiments: string[];
    };
  };
  handleTaskStart: (link: string) => void;
  handleCookieWarning: () => void;
  session: Session;
};

type CompletedTaskData = Record<string, any[] | 'error'>;

type UserData = Record<string, number>;

export default function TaskDisplay({ props }: { props: TaskDisplayProps }) {
  const {
    isHovered,
    disableLink,
    language,
    languageData,
    handleTaskStart,
    handleCookieWarning,
    session,
  } = props;
    
    const [completedTaskData, setCompletedTaskData] = useState<CompletedTaskData | undefined>();
    const [userData, setUserData] = useState<UserData>({});

    const tasksData = [
        { name: 'Reaction Time', link: '/tasks/reaction_time/reactionTime', imgSrc: '/img/icons/svgLightning.svg', imgWidth: 60, imgHeight: 60, endpoint:"api/rt" },
        { name: 'Action Per Minute', link: '/tasks/apm/apm', specialH1: 'APM', specialH1Class: styles.apm_style, endpoint:"api/apm" },
        { name: 'Hand Eye Coordination', link: userData['Hand Eye Coordination'] == 1 ? '/tasks/hand_eye_2/handEye2' : '/tasks/hand_eye/handEye', imgSrc: '/img/icons/svgAim.svg', imgWidth: 60, imgHeight: 60, endpoint:"api/handeye" },
        { name: 'Visual Memory', link: '/tasks/visual_memory/visualMemory', imgSrc: '/img/icons/svgWm.svg', imgWidth: 60, imgHeight: 60, endpoint:"api/memory" },
        { name: 'Simon Task', link: '/tasks/simon/simon', imgSrc: '/img/icons/svgSimon.svg', imgWidth: 80, imgHeight: 60, endpoint:"api/simonTask" },
        { name: 'Flanker Task', link: '/tasks/flanker/flankerTask', imgSrc: '/img/icons/svgFlanker.svg', imgWidth: 100, imgHeight: 60, endpoint:"api/flanker" },
        { name: 'Attentional Networks', link: '/tasks/network/networkTask', imgSrc: '/img/icons/svgArrow.svg', imgWidth: 200, imgHeight: 60, endpoint:"api/network" },
      ];
    console.log(userData)
    const fetchTaskData = async () => {
      const taskDataResults : any = {};
        
      await Promise.all(tasksData.map(async (task) => {
        try {
          const response = await fetch(task.endpoint);
          const data = await response.json();
          
          if (data && data.data && data.data.length > 0) {
            taskDataResults[task.name] = data.data;
          } else {
            taskDataResults[task.name] = [];
          }
        } catch (error) {
          console.log(error);
          taskDataResults[task.name] = 'error';
        }
      }));
      setCompletedTaskData(taskDataResults)
      return taskDataResults
    };

    let dataByEmail : any 
    const fetchCompletedData = async(completedTaskData : any) => {
      const completedTaskResults : any = {};
      if(completedTaskData) {
        Object.keys(completedTaskData).map(key=>{
          if(completedTaskData[key].length) {
            dataByEmail = completedTaskData[key].filter((data: any) => data.email === session?.user?.email)
            completedTaskResults[key] =  dataByEmail.length
          } else {
            completedTaskResults[key] =  0
          }
        })
        
        setUserData(completedTaskResults)
      }
    }

    useEffect(() => {
        fetchTaskData()
        .then(data=>{
          fetchCompletedData(data)
        })
      }, []);
      
    return ( 
        <div className={`${styles.main} ${isHovered ? styles.shrink : ""}`}>
        {tasksData.map((task, index) => (
            <div key={index} className={index == 5 || index == 6 ? styles.task_disabled : styles.task}>
            {disableLink ? (
                <Link href="">
                <h2>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            ) : (
                <Link href={task.link}>
                <h2 style={{color: index == 5 || index == 6 ? "rgb(215, 215, 215)" : "" }}>{language ? languageData.hun.experiments[index] : task.name}</h2>
                </Link>
            )}
            
            {task.specialH1 ? (
                <h1 className={`${task.specialH1Class} ${styles.icon_style}`}>
                {task.specialH1}
                </h1>
            ) : (
            index == 1 ? (
                task.imgSrc && (
                <Image
                    className={styles.icon_style_flanker}
                    src={task.imgSrc}
                    alt={`${task.name} Icon`}
                    width={task.imgWidth}
                    height={task.imgHeight}
                />
                )
            ) : (
                task.imgSrc && (
                <Image
                    className={styles.icon_style}
                    src={task.imgSrc}
                    alt={`${task.name} Icon`}
                    width={task.imgWidth}
                    height={task.imgHeight}
                />
                )
            )
            )}
            
            {disableLink ? (
                <Link href={''}>
                <button className={styles.task_button} onClick={(e) => { e.preventDefault(), handleCookieWarning(); }}>
                    <p>Start</p>
                </button>
                </Link>
            ) : index == 5 || index == 6 ? (
                <Link href={task.link}>
                <button className={styles.task_disabled_button} disabled={true} onClick={(e) => { e.preventDefault(), handleTaskStart(task.link) }}>
                    <p>Start</p>
                </button>
                </Link>
            ) : (
              <Link href={task.link}>
              <button className={styles.task_button} onClick={(e) => { e.preventDefault(), handleTaskStart(task.link) }}>
                  <p>Start</p>
              </button>
              </Link>
              ) 
          }
            
            <ProgressBar completed={
              task.name == "Hand Eye Coordination" 
                ? Number((50 * (userData[task.name] ?? 0)).toFixed(0)) 
                : userData[task.name] != 0 
                  ? 100 
                  : 0
            } />

            </div>
        ))}
    </div>
    )
}
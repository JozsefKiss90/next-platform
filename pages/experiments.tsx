import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/navbar";
import ProgressBar from "../components/progressBar";
import { Session, User } from "next-auth";
import { AppContext } from "../components/layout"
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useRouter } from "next/router";

interface UserData {
  email: string;
  taskName: string;
  taskResult: number; 
}

interface GameStat {
  _id: string;
  game: string;
  email: string;
  rank: string;
  bestRank: string;
  gameTime: number;
  age: number;
  __v: number;
}


interface UserProps {
  session: Session | null | undefined;
  userStats: GameStat | null | undefined;
}

interface AppContextValue {
  isHovered: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  languageData: any
  language: boolean
}

export default function Experiments({ session, userStats }: UserProps) {

  const { isHovered, languageData, language } = useContext(AppContext)  as AppContextValue;
  const router = useRouter();

  const [taskData, setTaskData] = useState<UserData[] | undefined>();
  const [userData, setUserData] = useState<UserData[] | undefined>();
  const [completed, setCompleted] = useState<number>(0);
  const [mobileWarning, setmobileWarning] = useState(false)
  const [disableLink, setDisableLink] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);


  useEffect(() => {
    const hasCookie = localStorage.getItem('cookie_statistics_disabled')
    if(hasCookie == 'true') {
      setDisableLink(!disableLink)
    }
  }, []);

  const handleCookieWarning = () => {
    setShowModal(!showModal);
  };

  const handleTaskStart = () => {
    if (!userStats) {
      setShowWarning(true);
    } else {
      router.push('/tasks/reactionTime');
    }
  };
  
  console.log(showWarning)
  const handleCookieDelete = () => {
    setDisableLink(false)
    localStorage.removeItem('cookie_statistics_disabled')
  };

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
      {showWarning ? (<div className={styles.popup}>
        <h4 style={{padding:"20px"}}>
            Még nem töltötted ki a profil adatokat!
          </h4>
          <Link href="/user_form" style={{display:'flex', justifyContent:'center'}}>
            <button  className={styles.popup_button}>
              <p>{language ? languageData.hun.index[2] : "Profile"}</p>
            </button>
          </Link>
      </div>) :
      showModal ? (<div className={styles.modal}>
              <p>
                Cookies for statistical data was disabled. Do you want to enable it?
              </p> 
              <div className={styles.modal_buttons}>
                <div>
                  <button onClick={(e)=> {e.preventDefault(); handleCookieWarning(); handleCookieDelete()}}>
                      <p> 
                        Yes
                      </p>
                  </button>
                </div>
               <div>
                <button onClick={(e)=> {e.preventDefault(); handleCookieWarning()}}>
                    <p>
                      No
                    </p>
                  </button>
               </div>
              </div>  
            </div>) : (
              <>
              <div className={`${styles.main} ${isHovered ? styles.shrink : ""}`}>
                <div className={styles.task}>
                  {disableLink ? (
                    <Link href=""><h2>{language ? languageData.hun.experiments[0] :"Reaction Time"}</h2></Link>
                  ) : (
                    <Link href="/tasks/reactionTime">
                      <h2>{language ? languageData.hun.experiments[0] :"Reaction Time"}</h2>
                    </Link>
                  )}
                  <Image
                      className={styles.icon_style}
                      src="/img/icons/svgLightning.svg"
                      alt="SVG Icon"
                      width={60}
                      height={60}
                    />      
                    {disableLink ? (
                      <Link href={''}>
                        <button className={styles.task_button} onClick={(e)=> {e.preventDefault(); handleCookieWarning(); }}>
                          <p>
                            Start
                          </p>
                        </button>
                      </Link>
                      ) : (
                        <button className={styles.task_button} onClick={handleTaskStart}>
                          <p>Start</p>
                        </button>
                    )}
                  <ProgressBar completed={100} />
                </div>
                <div className={styles.task}>
                  <a href={'/tasks/flankerTask'}>
                    <h2>{language ? languageData.hun.experiments[1] : "Flanker Task"}</h2>
                  </a> 
                  <Image
                      className={styles.icon_style_flanker}
                      src="/img/icons/svgFlanker.svg"
                      alt="SVG Icon"
                      width={100}
                      height={80}
                    />      
                    {disableLink ? (
                      <Link href={''}>
                        <button className={styles.task_button} onClick={() => { handleCookieWarning() }}>
                          <p>
                            Start
                          </p>
                        </button>
                      </Link>
                      ) : (
                        <Link href={'/tasks/flankerTask'}>
                        <button className={styles.task_button}>
                          <p>
                            Start
                          </p>
                        </button>
                      </Link>
                    )}
                  <ProgressBar completed={100} />
                </div>
                <div className={styles.task}>
                  <a href={'/tasks/networkTask'}>
                    <h2>{language ? languageData.hun.experiments[2] :"Attentional Networks"}</h2>
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
                  <ProgressBar completed={50} />
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
                    <h2>{language ? languageData.hun.experiments[3] :"Hand Eye Coordination"}</h2>
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
                  <ProgressBar completed={10} />
                </div>
                <div className={styles.task}>
                  <a href={'/tasks/visualMemoryTask'}>
                    <h2>{language ? languageData.hun.experiments[4] :"Visual Memory"}</h2>
                  </a>  
                  <Image
                      className={styles.icon_style}
                      src="/img/icons/svgWm.svg"
                      alt="SVG Icon"
                      width={60}
                      height={60}
                    />      
                <a href={'/tasks/visualMemoryTask'}>
                  <button className={styles.task_button}>
                      <p>
                        Start
                      </p>
                    </button>
                </a>
                  <ProgressBar completed={100} />
                </div>
              </div>
              <div style={{...slideStyle}}>
                {mobileWarning ? (
                  <div className={styles.modal_2}>
                  <p style={{textAlign:'center'}}>
                    The experiments can be completed on desktop.
                  </p> 
                  <div className={styles.modal_buttons}>
                    <button style={{marginTop:'20px'}} className={styles.task_button} onClick={()=>{setmobileWarning(!mobileWarning)}}>
                          <p> 
                            Ok
                          </p>
                      </button>
                  </div>
                </div>
                ) : (
                  <Carousel showStatus={false} className={styles.container_mobile}>
                  <div className={styles.task}>
                    <h2 onClick={()=>{setmobileWarning(!mobileWarning)}}>
                      {language ? languageData.hun.experiments[0] :"Reaction Time"}
                    </h2>
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
                    <ProgressBar completed={100} />
                  </div>
                  <div className={styles.task}>
                    <h2>{language ? languageData.hun.experiments[1] :"Flanker Task"}</h2>
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
                    <h2>{language ? languageData.hun.experiments[2] :"Attentional Networks"}</h2>
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
                    <h2>Action Per Minute</h2>
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
                    <h2>{language ? languageData.hun.experiments[3] :"Hand Eye Coordination"}</h2>
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
                )
                }
              </div>
              </>
            )
          }
    </div> 
    </>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })
  const cookies = req.headers.cookie;
  const res = await fetch('/api/gameStats', {
    headers: {
      cookie: cookies
    }
  });

  const gamesData = await res.json(); 
  const email  = session?.user?.email
  const filteredStats = gamesData.data.filter((data: { email: string | null | undefined; }) => data.email === email);
  const userStats = filteredStats.length > 0 ? filteredStats[0] : null;

  if (!session) { 
    return {  
      redirect : { 
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session, userStats}
  }
}

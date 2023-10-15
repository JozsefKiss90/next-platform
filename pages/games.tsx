import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/navbar";
import ProgressBar from "../components/progressBar";
import { AppContext } from "../components/layout"
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { UserData, GameUserProps, GameAppContextValue } from "../types/types";

export default function Experiments({ session }: GameUserProps) {

  const { isHovered } = useContext(AppContext)  as GameAppContextValue;
 
  const [taskData, setTaskData] = useState<UserData[] | undefined>();
  const [userData, setUserData] = useState<UserData[] | undefined>();
  const [completed, setCompleted] = useState<number>(0);
  //const [verifyModal, setVerifyModal] = useState(false)
  const [disableLink, setDisableLink] = useState(false);

  useEffect(() => {
    const hasCookie = localStorage.getItem('cookie_statistics_disabled')
    if(hasCookie == 'true') {
      setDisableLink(!disableLink)
    }
    console.log(disableLink)
  }, []);

  const [showModal, setShowModal] = useState(false);
  console.log(disableLink)

  const handleCookieWarning = () => {
    setShowModal(!showModal);
  };

  const handleCookieDelete = () => {
    setDisableLink(false)
    localStorage.removeItem('cookie_statistics_disabled')
  };


  useEffect(() => {
    fetch('/api/gameStats')
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
      {showModal ? (<div className={styles.modal}>
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
                    <Link href=""><h2>Super Hexagon</h2></Link>
                  ) : (
                    <Link href="/tasks/hexagon">
                      <h2>Super Hexagon</h2>
                    </Link>
                  )}
                  <Image
                      className={styles.icon_style}
                      src="/img/icons/svgHexagon.svg"
                      alt="SVG Icon"
                      width={60}
                      height={60}
                    />      
                    {disableLink ? (
                      <Link href={'/tasks/hexagon'}>
                        <button className={styles.task_button} onClick={(e)=> {e.preventDefault(); handleCookieWarning() }}>
                          <p>
                            Start
                          </p>
                        </button>
                      </Link>
                      ) : (
                        <Link href={'/tasks/hexagon'}>
                            <button className={styles.task_button}>
                            <p>
                                Start
                            </p>
                            </button>
                        </Link>
                    )}
                  <ProgressBar completed={100} />
                </div>
              </div>
              <div style={{...slideStyle}}>
                <Carousel showStatus={false} className={styles.container_mobile}>
                    <div className={styles.task}>
                        <a href={'/tasks/hexagon'}>
                            <h2>Super Hexagon</h2>
                        </a>
                        <Image
                            className={styles.icon_style}
                            src="/img/icons/svgHexagon.svg"
                            alt="SVG Icon"
                            width={60}
                            height={60}
                            />      
                        <Link href={'/tasks/hexagon'}>
                            <button className={styles.task_button}>
                            <p>
                                Start
                            </p>
                            </button>
                        </Link>
                        <ProgressBar completed={90} />
                    </div>
                    <div>

                    </div>
                </Carousel>
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

import styles from "../styles/Experiments.module.scss";
import { getSession } from "next-auth/react";
import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/navbar";
import { Session, User } from "next-auth";
import { AppContext } from "../components/layout"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import TaskDisplay from "../hooks/taskDisplay";
import MobileCarousel from "../hooks/mobileCarousel";
import ModalWarning from "../hooks/modalWarning";

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


  
  const taskDisplayProps = {
    isHovered, disableLink , language, languageData, handleTaskStart, handleCookieWarning
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
        showModal ? (
          <ModalWarning/>
          ) : (
              <>
               <TaskDisplay props={taskDisplayProps}/>
               <MobileCarousel language={language} languageData={languageData}/>

              </>
            )
          }
    </div> 
    </>
  );
}

export async function getServerSideProps({ req }: any) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";

  const session = await getSession({ req })
  const cookies = req.headers.cookie;
  const res = await fetch(`${baseUrl}/api/gameStats`, {
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

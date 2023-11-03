import { getSession } from "next-auth/react"
import { useState, useEffect, useContext } from "react"
import Navbar from "../components/navbar"
import { AppContext } from "../components/layout"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from "next/router"
import TaskDisplay from "../components/taskDisplay"
import MobileCarousel from "../hooks/mobileCarousel"
import ModalWarning from "../hooks/modalWarning"
import ProfileWarning from "../hooks/profileWarning"
import { UserData, UserProps, AppContextValue } from "../types/types"

export default function Experiments({ session, userStats }: UserProps) {

  const { isHovered, languageData, language } = useContext(AppContext)  as AppContextValue
  const router = useRouter()

  const [taskData, setTaskData] = useState<UserData[] | undefined>()
  const [userData, setUserData] = useState<UserData[] | undefined>()
  const [completed, setCompleted] = useState<number>(0)
  const [disableLink, setDisableLink] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)

  const handleCookieWarning = () => {
    setShowModal(!showModal)
  }

  const handleTaskStart = (url:string) => {
    if (!userStats) {
      setShowWarning(true)
    } else {
      router.push(url)
    }
  }

  useEffect(() => {
    fetch('/api/handeye')
      .then(res => res.json())
      .then(data => setTaskData(data.data))
      .catch(err => console.log(err)) 
  }, [])

  useEffect(() => {
    if (taskData !== undefined && session?.user?.email) {
      const userTaskData = taskData.filter((data: UserData) => data.email === session?.user?.email)
      setUserData(userTaskData)
    }
  }, [taskData, session?.user?.email])
  
  useEffect(() => {
    if (userData !== undefined) {
      switch (userData.length) {
        case 1:
          setCompleted(33)
          break 
        case 2:
          setCompleted(66)
          break
        case 3:
          setCompleted(100)
          break
        default: 
          setCompleted(0)
          break
      }
    } 
  }, [userData])

  
  const taskDisplayProps = {
    isHovered, disableLink , language, languageData, handleTaskStart, handleCookieWarning, session
  }

  return ( 
    <>
      <Navbar />
      {showWarning ? (
        <ProfileWarning language={language} languageData={languageData}/>
      ) :
        showModal ? (
          <ModalWarning/>
          ) : (
              <>
               <TaskDisplay props={taskDisplayProps}/>
               <MobileCarousel language={language} languageData={languageData}/>
              </>
            )
          } 
    </>
  )
}

export async function getServerSideProps({ req }: any) {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000"

  const session = await getSession({ req })
  const cookies = req.headers.cookie
  const res = await fetch(`${baseUrl}/api/gameStats`, {
    headers: {
      cookie: cookies
    } 
  })

  const gamesData = await res.json() 
  const email  = session?.user?.email
  let filteredStats
  let userStats

  if(gamesData.data) {
    filteredStats = gamesData.data.filter((data: { email: string | null | undefined }) => data.email === email)
    userStats = filteredStats.length > 0 ? filteredStats[0] : null
  }

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

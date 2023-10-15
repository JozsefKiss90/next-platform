import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'
import login_validate from '../lib/validate'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react' 
import styles from '../styles/Forms.module.scss'
import NextImage  from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { AppContext } from "../components/layout"
import Spinner from '../components/spinner'
import LoginHandlers from '../hooks/loginHandlers'
import LoginDisplay from '../hooks/loginDisplay'

interface AppContextValue {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  languageData: any
  language: boolean
}

export default function Login() {

  const { isLogin, language, languageData } = useContext(AppContext) as AppContextValue
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://platform-app.herokuapp.com' : 'http://localhost:3000'

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const image = new Image()
    image.src = '/img/login_image.png'
    image.onload = () => {
      setIsImageLoaded(true)
    }
  }, [isLogin])

  const { handleGoogleSignin, formik } = LoginHandlers({ setIsLoading, setErrorMessage, language, baseUrl })
  
  const dispayProps = { 
    handleGoogleSignin, 
    formik, 
    isImageLoaded, 
    isLoading,
    errorMessage,
    language,
    languageData,
    setErrorMessage,
    
   }

  return (
    <>
      <LoginDisplay props = {dispayProps}/>
    </>
  )
}

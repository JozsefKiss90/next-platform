import { useEffect, useState, useContext } from 'react' 
import { AppContext } from "../components/layout"
import LoginHandlers from '../hooks/loginHandlers'
import LoginDisplay from '../hooks/loginDisplay'
import { LoginAppContextValue } from '../types/types'

export default function Login() {

  const { isLogin, language, languageData } = useContext(AppContext) as LoginAppContextValue
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

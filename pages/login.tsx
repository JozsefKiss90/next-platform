import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import login_validate from '../lib/validate';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react'; 
import styles from '../styles/Forms.module.scss';
import NextImage  from 'next/image';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { AppContext } from "../components/layout"
import Spinner from '../components/spinner';

interface AppContextValue {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  languageData: any
  language: boolean
}

export default function Login() {

  const { isLogin, language, languageData } = useContext(AppContext)  as AppContextValue;
  const baseUrl = process.env.NODE_ENV === "production" ? "https://platform-app.herokuapp.com" : "http://localhost:3000";

  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const image = new Image();
    image.src = '/img/login_image.png';
    image.onload = () => {
      setIsImageLoaded(true);
    };
  
  }, [isLogin]); 

  async function handleGoogleSignin() {
    setIsLoading(true); // set loading state to true
    const result = await signIn('google', { callbackUrl: baseUrl });
    if (result?.error) {
      console.error('Error signing in:', result.error);
    }
    setIsLoading(false); // set loading state to false after the operation
}


  async function handleGitHubSignin() {
    await signIn('github', { callbackUrl: baseUrl });
  }

  async function handleFacebookSignin() {
    setIsLoading(true);
    const result = await signIn('facebook', {
      callbackUrl: baseUrl
    });
     if (result?.error) {
     console.error('Error signing in:', result.error);
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit
  });

  async function onSubmit(values: any) {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setIsLoading(false);
  
    if (result?.error) {
      console.error('Error signing in:', result.error);
      setErrorMessage(language ? "Hibás jelszó vagy felhasználónév" :"Invalid credentials. Please try again."); // <-- Set the error message
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    }
  }
  

  return (
    <>
      {isImageLoaded ? (
        <section className={styles.form_wrapper}>
        <div className={styles.form_container}>
          <div className={styles.form_content}>
            <div className={styles.title}>
              <h1>Esport Lab</h1>
              <p style={{fontSize:'1.1rem'}}>
              {language ? languageData.hun.login[0] : "An experimental platform  for e-sport players"}
              </p>
            </div>

            <form style={{width: '100%'}} onSubmit={formik.handleSubmit}>
            {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}

            <div className={styles.input_group}>
            <input
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                    className={styles.input_text}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setErrorMessage(""); // <-- Reset the error message
                    }}
                  />  
                  <span className={styles.icon} >
                        <HiAtSymbol size={25} />
                  </span>
            </div>
            <div className={styles.input_group}>
            <input
                type="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
                className={styles.input_text}
                onChange={(e) => {
                  formik.handleChange(e);
                  setErrorMessage(""); // <-- Reset the error message
                }}
              />
              <span className={styles.icon} >
                  <HiFingerPrint size={25} />
              </span>
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

            <div className={styles.input_button}>
              <button type="submit" className={styles.button}>{language ? languageData.hun.login[1] : "Login"}</button>
            </div>
            <div className={styles.input_button}>
              <button type="button" onClick={handleGoogleSignin} className={styles.button}>
              {language ? languageData.hun.login[2] : "Sign In with Google"}
                <NextImage className={styles.button_icon} src={'/img/icons/google.svg'} width="20" height="20" alt={'image'} ></NextImage>
              </button>
            </div>
          
            <div className={styles.singup_link}>
                 <p className={styles.singup}>
                 {language ? languageData.hun.login[4] : "Don't have an account yet?"} 
                </p>
                <div>
                <button type="button" className={styles.singup_button}>
                  <Link href={'/register'}>{language ? languageData.hun.login[5] : "Sign Up"} </Link>
                </button>
                </div>
            </div>
          </form>      
        </div>
      </div>
      <>
          {isLoading ? (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <Spinner></Spinner>
          </div>
          
          ) : ""}
          </>
    </section> 
    ): (
      <div>
        <Spinner></Spinner>
        <h2 className={styles.loadingText}>Loading...</h2>
      </div>
    )}
    </>
  )
}

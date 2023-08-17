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

  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = '/img/login_image.png';
    image.onload = () => {
      setIsImageLoaded(true);
    };
  
  }, [isLogin]); 

  async function handleGoogleSignin() {
    const result = await signIn('google', { callbackUrl: 'http://localhost:3001/login' });
    if (result?.error) {
      console.error('Error signing in:', result.error);
    }
  }

  async function handleGitHubSignin() {
    await signIn('github', { callbackUrl: 'http://localhost:3001/login' });
  }

  async function handleFacebookSignin() {
    const result = await signIn('facebook', {
      callbackUrl: 'http://localhost:3001/login'
    });
     if (result?.error) {
     console.error('Error signing in:', result.error);
    }
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
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: 'http://localhost:3001/login'
    });

    if (result?.error) {
      console.error('Error signing in:', result.error);
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
            <h1>Esport sLab</h1>
            <p style={{fontSize:'1.1rem'}}>
            {language ? languageData.hun.login[0] : "An experimental platform  for e-sport players"}
            </p>
          </div>

          <form style={{width: '100%'}} onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
          <input
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                  className={styles.input_text}
                />  
                <span className={styles.icon} >
                      <HiAtSymbol size={25} />
                </span>
          </div>
            {formik.errors.email && formik.touched.email ? (
              <span className={styles.text_rose_500}>{formik.errors.email}</span>
            ) : (
              <></>
            )}
          <div className={styles.input_group}>
            <input
                type="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
                className={styles.input_text}
              />
              <span className={styles.icon} >
                  <HiFingerPrint size={25} />
              </span>
          </div>
            {formik.errors.password && formik.touched.password ? (
              <span className={styles.text_rose_500}>{formik.errors.password}</span>
            ) : (
              <></>
            )}

            {/* login buttons */}
            <div className={styles.input_button}>
              <button type="submit" className={styles.button}>{language ? languageData.hun.login[1] : "Login"}</button>
            </div>
            <div className={styles.input_button}>
              <button type="button"  onClick={handleGoogleSignin} className={styles.button_disabled}>
              {language ? languageData.hun.login[2] : "Sign In with Google"}
                <NextImage className={styles.button_icon} src={'/img/icons/google.svg'} width="20" height="20" alt={'image'} ></NextImage>
              </button>
            </div>
            <div className={styles.input_button}>
              <button type="button"  onClick={handleFacebookSignin} className={styles.button_disabled}>
              {language ? languageData.hun.login[3] : "Sign In with Facebook"} 
                <NextImage className={styles.button_icon_facebook} src={'/img/icons/facebook.svg'} width="25" height="25" alt={'image'} ></NextImage>
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

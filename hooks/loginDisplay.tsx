import Spinner from '../components/spinner'
import styles from '../styles/Forms.module.scss'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import Link from 'next/link'
import NextImage  from 'next/image'

const LoginDisplay = ({props}:any) => {

   const { 
        handleGoogleSignin, 
        formik, 
        isImageLoaded, 
        isLoading,
        errorMessage,
        language,
        languageData,
        setErrorMessage
       } = props

    return(
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
                      formik.handleChange(e)
                      setErrorMessage("") 
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
                  formik.handleChange(e)
                  setErrorMessage("") 
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
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
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

export default LoginDisplay
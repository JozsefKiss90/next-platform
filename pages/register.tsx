import Link from "next/link"
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from "next/router";
import styles from '../styles/Forms.module.scss';
import { AppContext } from "../components/layout"
import { useContext } from "react";

interface AppContextValue {
    languageData: any
    language: boolean
  }

export default function Register() {

    const {language, languageData } = useContext(AppContext)  as AppContextValue;

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values:any){
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('/api/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('/')
            })
            .catch(error => console.error(error))
    }
    
    return(
        <section className={styles.form_wrapper}>
            <div className={styles.form_container}>
                <div className={styles.form_content}>
                <div className={styles.title}>
                    <h1>Esport Lab</h1>
                    <p>{language ? languageData.hun.register[0] : "Register"}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.input_group}>
                        <div className={styles.input_wrapper}>
                            <input 
                            type="text"
                            placeholder={language ? languageData.hun.register[1] : "Username"}
                            {...formik.getFieldProps('username')}
                            className={styles.input_text}
                            />
                            <span className='icon flex items-center px-4'>
                                
                            </span>
                        </div>
                        
                    </div>
                    {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
                    <div className={styles.input_group}>
                        <div className={styles.input_wrapper}>
                            <input 
                            type="email"
                            placeholder='Email'
                            {...formik.getFieldProps('email')}
                            className={styles.input_text}
                            />
                            <span className='icon flex items-center px-4'>
                            
                            </span>
                        </div>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                    <div className={styles.input_group}>
                        <div className={styles.input_wrapper}>
                            <input 
                            type = "password"
                            placeholder={language ? languageData.hun.register[2] :'Password'}
                            {...formik.getFieldProps('password')}
                            className={styles.input_text}
                            />
                            <span>
                            
                            </span>
                        </div>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                    <div className={styles.input_group}>
                        <div className={styles.input_wrapper}>
                            <input 
                            type='password'
                            placeholder={language ? languageData.hun.register[3] :'Confirm Password'}
                            {...formik.getFieldProps('cpassword')}
                            className={styles.input_text}
                            />
                            <span>
                            
                            </span>
                        </div>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div className={styles.input_button}>
                            <button type="submit" className={styles.button}>
                            {language ? languageData.hun.register[4] : "Sign Up"}
                            </button>
                        </div>
                        <div>
                            <p className={styles.singup}>
                            {language ? languageData.hun.register[5] :"Have an account?"}
                            </p>
                       </div>
                        <div className={styles.input_button}>
                            <button type="submit" className={styles.button}>
                                <Link style={{textDecoration: 'none'}} href={'/login'}>   {language ? languageData.hun.register[6] :"Sign In"}</Link>
                            </button>
                        </div>
                    </div>
                </form>
               
                </div>
            </div>
    </section>
    )
}
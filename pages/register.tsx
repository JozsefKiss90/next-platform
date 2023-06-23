import Link from "next/link"
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from "next/router";
import styles from '../styles/Forms.module.scss';

export default function Register() {

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

        await fetch('/api/auth/signup', options)
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
                    <h1>Register</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.input_group}>
                        <div className={styles.input_wrapper}>
                            <input 
                            type="text"
                            placeholder='Username'
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
                            placeholder='Password'
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
                            placeholder='Confirm Password'
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
                                Sign Up
                            </button>
                        </div>
                        <div>
                            <p className={styles.singup}>
                                Have an account?
                            </p>
                       </div>
                        <div className={styles.input_button}>
                            <button type="submit" className={styles.button}>
                                <Link style={{textDecoration: 'none'}} href={'/login'}>Sign In</Link>
                            </button>
                        </div>
                    </div>
                </form>
               
                </div>
            </div>
    </section>
    )
}
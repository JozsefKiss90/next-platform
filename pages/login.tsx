import Link from "next/link"
import {signIn, signOut} from "next-auth/react";
import { useFormik } from 'formik';
import login_validate from '../lib/validate';
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react"

export default function Login(){  
    const { data: session } = useSession()
    const router = useRouter()
   
    async function handleGoogleSignin(){
        const result = await signIn('google', { callbackUrl : "http://localhost:3000"})
        if (result?.error) {
          console.error("Error signing in:", result.error)
        }
    }

    async function handleGitHubSignin(){
        await signIn('github', { callbackUrl : "http://localhost:3000"})
    } 

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })

    async function onSubmit(values:any){

        const result = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: 'http://localhost:3000'
        });
        console.log(result)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const session = await getSession();
        console.log(session)
        if (result?.error) {
          console.error("Error signing in:", result.error);
        } else {
            console.log(result)
          router.push('/');
        }
      }
      
    
    return (

    <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
            <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
        </div>

        {/* form */}
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div>
                <input 
                type="email"
                placeholder='Email'
                
                {...formik.getFieldProps('email')}
                />
                <span className='icon flex items-center px-4'>
                  
                </span>
               
            </div>
            {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}

            <div>
                <input 
             
                type='password'
                placeholder='password'
            
                {...formik.getFieldProps('password')}
                />
                 <span className='icon flex items-center px-4'>
                    
                </span>
               
            </div>

            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
            {/* login buttons */}
            <div className="input-button">
                <button type='submit'>
                    Login
                </button>
            </div>
            <div className="input-button">
                <button type='button' onClick={handleGoogleSignin}>
                    Sign In with Google 
                </button>
            </div>
            <div className="input-button">
                <button type='button'  onClick={handleGitHubSignin}>
                    Sign In with Github 
                </button>
            </div>
        </form>

        {/* bottom */}
        <p className='text-center text-gray-400 '>
            don't have an account yet? <Link href={'/register'}>Sign Up</Link>
        </p>
    </section>
    )
}
import Link from "next/link"
import {useState} from 'react'
export default function Register() {

    const [show, setShow] = useState()
    
    return(
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
        </div>

        {/* form */}
        <form className='flex flex-col gap-5'>
            <div>
                <input 
                type="text"
                name='Username'
                placeholder='Username'
                />
                <span className='icon flex items-center px-4'>
                    
                </span>
            </div>
            {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
            <div>
                <input 
                type="email"
                name='email'
                placeholder='Email'
                />
                <span className='icon flex items-center px-4'>
                  
                </span>
            </div>
            {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
            <div>
                <input 
                type = "text"
                name='password'
                placeholder='password'
                
                />
                 <span className='icon flex items-center px-4'>
                 
                </span>
            </div>
            {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

            <div>
                <input 
                type='text'
                name='cpassword'
                placeholder='Confirm Password'
                />
                 <span className='icon flex items-center px-4'>
                 
                </span>
            </div>
            {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

            {/* login buttons */}
            <div className="input-button">
                <button type='submit'>
                    Sign Up
                </button>
            </div>
        </form>

        {/* bottom */}
        <p className='text-center text-gray-400 '>
            Have an account? <Link href={'/login'}>Sign In</Link>
        </p>
    </section>
    )
}
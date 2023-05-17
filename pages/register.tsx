import Link from "next/link"
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from "next/router";

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

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            })
    }
    
    return(
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
        </div>

        {/* form */}
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div>
                <input 
                type="text"
                placeholder='Username'
                {...formik.getFieldProps('username')}
                />
                <span className='icon flex items-center px-4'>
                    
                </span>
            </div>
            {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
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
                type = "text"
                placeholder='password'
                {...formik.getFieldProps('password')}
                />
                 <span className='icon flex items-center px-4'>
                 
                </span>
            </div>
            {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

            <div>
                <input 
                type='text'
                placeholder='Confirm Password'
                {...formik.getFieldProps('cpassword')}
                />
                 <span className='icon flex items-center px-4'>
                 
                </span>
            </div>
            {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}

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
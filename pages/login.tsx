import Link from "next/link"

export default function Login(){ 
    
    return (

    <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
            <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
        </div>

        {/* form */}
        <form className='flex flex-col gap-5'>
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
             
                name='password'
                placeholder='password'
            
                />
                 <span className='icon flex items-center px-4'>
                    
                </span>
               
            </div>

            {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
            {/* login buttons */}
            <div className="input-button">
                <button type='submit'>
                    Login
                </button>
            </div>
            <div className="input-button">
                <button type='button'>
                    Sign In with Google 
                </button>
            </div>
            <div className="input-button">
                <button type='button'>
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
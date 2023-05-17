
import Link from "next/link"
import Navbar from "../components/navbar"
import {useSession, getSession} from "next-auth/react";

export default function Home() {
  
  const { data: session} = useSession();

  return (
      <>
        {User({ session })}
      </>
  )
} 

function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>
          <div className='flex justify-center'>
            <Link href={'/login'}>Sign In</Link>
          </div>
      </main>
  )
}

function User({ session }:any) {
  return(
   <>
      <div style={{marginLeft:'200px'}}>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
    <Navbar/>
   </>
  )
}


export async function getServerSideProps(context){

  const session = await getSession(context, { withCredentials: true })
  console.log("SESSION:")
  console.log(session)
  if(!session){ 
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }

}
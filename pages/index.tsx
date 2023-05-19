
import { Session } from "next-auth";
import Navbar from "../components/navbar"
import {useSession, getSession} from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';


interface UserProps {
  session: Session | null | undefined;
}

export default function Home() {
  
  const { data: session} = useSession();

  return (
      <>
        {User({ session })}
      </>
  )
} 


function User({ session }:UserProps) {
  return(
   <>
      <div style={{marginLeft:'200px'}}>
      {session && (
          <>
            <h5>{session.user?.name}</h5>
            <h5>{session.user?.email}</h5>
          </>
        )}
      </div>
    <Navbar/>
   </>
  )
}


export async function getServerSideProps( context: GetServerSidePropsContext)
 : Promise<GetServerSidePropsResult<{ session: Session | null }>>  {
  const session = await getSession(context)
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

import { Session } from "next-auth";
import Navbar from "../components/navbar"
import {getSession} from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import styles from "../styles/Index.module.scss"

interface UserProps {
  session: Session | null | undefined;
}

export default function Home({session} : UserProps) {
  
  return (
      <>
        {User({ session })}
      </>
  )
} 

function User({ session }:UserProps) {
  return(
   <>
      <div className={styles.credentials_container}>
      {session && (
          <>
            <h4>{session.user?.name}</h4>
            <h4 className={styles.email}>{session.user?.email}</h4>
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
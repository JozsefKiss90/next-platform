import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import 'jspsych/css/jspsych.css'
import { Session } from "next-auth";

interface TaskProps{
  email: string | undefined; 
  session: Session | null
}

export default function Page({ email } : TaskProps) {

  useEffect(() => {
    async function runTask(sessionEmail : string) {
      const module = await import('../../public/static/rt/rt.js');
      module.default(sessionEmail);
    }
    runTask(email!);
  }, []);

  const { data: session, status } = useSession();
  if(session){
    console.log("SESSION IS: " + session)
    return(
      <div style={{cursor:'pointer'}}>
       </div>
      )
  }
}

export async function getServerSideProps({ req } : any){
  const session = await getSession({ req })
  const email = session?.user?.email || null
  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { email }
  }
}
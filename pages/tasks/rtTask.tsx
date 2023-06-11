import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import 'jspsych/css/jspsych.css'

interface TaskProps{
  email: string | undefined;
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
 
    return(
      <div>
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
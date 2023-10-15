import {useSession, getSession} from "next-auth/react";
import { useEffect, useState } from 'react';
import 'jspsych/css/jspsych.css'

interface TaskProps{
  email: string | undefined;
}

export default function NetworkTask({ email } : TaskProps) {

  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession();
  
  useEffect(() => {
    async function runTask(sessionEmail : string) {
      const module = await import('../../../taskCollection/networks/network.js');
      module.default(sessionEmail);
    }
    runTask(email!);
  }, [setLoading]);

  
  if(session){

    return(
      <div className="styles">
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


import {useSession, getSession} from "next-auth/react";
import { useEffect, useState } from 'react';
import 'jspsych/css/jspsych.css'


export default function NetworkTask({ email }) {

  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession();
  
  useEffect(() => {
    async function runTask(sessionEmail) {
      const module = await import('../../public/static/network.js');
      module.default(sessionEmail);
    }
    console.log('ran')
    runTask(email);
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


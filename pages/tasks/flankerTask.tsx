import { useEffect } from 'react'; 
import {getSession} from "next-auth/react";
import 'jspsych/css/jspsych.css' 

interface TaskProps {
  email: string | undefined; 
}

export default function Flanker({ email} : TaskProps ) {
  useEffect(() => {
    async function runTask(sessionEmail : string) {
      const module = await import('../../taskCollection/flanker/flanker.js');
      module.default(sessionEmail);
    }
    runTask(email!);
  }, []); 

  return (
  <div>
  </div>
  )
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
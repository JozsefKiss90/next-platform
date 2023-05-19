import { useEffect } from 'react';
import {useSession, getSession} from "next-auth/react";
import 'jspsych/css/jspsych.css'

export default function Flanker({ email }) {

  useEffect(() => {
    async function runTask(sessionEmail) {
      const module = await import('../../public/static/flanker.js');
      module.default(sessionEmail);
    }
    runTask(email);
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
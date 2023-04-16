import Script from 'next/script'
import Head from 'next/head'
import {useSession, getSession} from "next-auth/react";
import { useEffect } from 'react';
import 'jspsych/css/jspsych.css'
export default function Page() {

  useEffect(() => {
    async function runTask() {
      const module = await import('../../public/static/task2.js');
      module.default();
    }
    runTask();
  }, []);

  const { data: session, status } = useSession();
  if(session){
  //  let email : string = session.user.email
  
    return(
      <div>
       </div>
      )
  }
}

export async function getServerSideProps({ req } : any){
  const session = await getSession({ req })

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


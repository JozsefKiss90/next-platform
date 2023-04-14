import Script from 'next/script'
import Head from 'next/head'
import {useSession, getSession} from "next-auth/react";

export default function Page() {

  const { data: session, status } = useSession();
  if(session){
    let email : string = session.user.email
    return(
      <div>
        <Head>
          <link href="https://unpkg.com/jspsych@7.3.1/css/jspsych.css" rel="stylesheet" type="text/css" />
        </Head>
        <Script src="https://unpkg.com/jspsych@7.3.1" strategy="beforeInteractive"></Script>
        <Script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2" strategy="beforeInteractive"></Script>
        <Script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.2" strategy="beforeInteractive"></Script>
        <Script src="https://unpkg.com/@jspsych/plugin-preload@1.1.2" strategy="beforeInteractive"></Script>
        <Script src='/static/task.js' data-email={email}></Script>
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


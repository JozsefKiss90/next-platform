import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import  '../public/static/networks/default_style.css'
import '../public/static/style.css' 
import { Session } from 'next-auth';
import Head from 'next/head';

type AppPropsWithSession = AppProps & {
  pageProps: {
    session: Session | null;
  };
};

export default function App({ Component, pageProps }: AppPropsWithSession) {

  return(
    <>
   <Head>
    <link rel="preload" href="/backgrounds/bg3.jpg" as="image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
  </Head>
    <Layout>
      <SessionProvider session={pageProps.session}>
      <div>
        <Component {...pageProps} />
      </div>
      </SessionProvider>
    </Layout>
    </>
  )
}

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import  '../public/static/networks/default_style.css'
import '../public/static/networks/style.css'
import { Session } from 'next-auth';

type AppPropsWithSession = AppProps & {
  pageProps: {
    session: Session | null;
  };
};


export default function App({ Component, pageProps }: AppPropsWithSession) {
  return(
    <Layout>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  )
}

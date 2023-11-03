import React from 'react';
import Navbar from "../components/navbar";
import {getSession} from "next-auth/react";
import ProfileDisplay from '../components/profileDisplay';

interface TaskProps{
    email: string | undefined;
  }

export default function UserForm({ email } : TaskProps) {

  return (
    <>
    <Navbar />
    <ProfileDisplay email={email}/>
    </>
  );
}

export async function getServerSideProps({ req } : any) {
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
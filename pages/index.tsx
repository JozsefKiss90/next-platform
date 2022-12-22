
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import Navbar from "../components/navbar"
import {useState} from 'react'

export default function Home() {

  const [session, setSession] = useState(false)

  return (
      <>
        {session ? User() : Guest()}
      </>
  )
}

function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}>Sign In</Link>
          </div>
      </main>
  )
}

// Authorize User
function User(){
  return(
      <SessionProvider>
        <Navbar />
      </SessionProvider>
  )
}
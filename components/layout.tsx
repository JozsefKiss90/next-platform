import Navbar from './navbar'
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react"
import {signIn, signOut, useSession} from "next-auth/react";

export default function Layout({ children }: any) {

  return (
    <>
      <main>{children}</main>
    </>
  )
}
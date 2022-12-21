import Navbar from './navbar'
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
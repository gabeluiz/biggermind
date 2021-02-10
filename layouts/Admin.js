import React from "react";

// Auth session
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {

  const [ session, loading ] = useSession()

  if (typeof window !== 'undefined' && loading) return null

  if (!session) return (
    <>
      {!session && <>
        Not signed in <br/>
        <button onClick={signIn('auth0')}>Sign in</button>
      </>}
    </>
  )

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
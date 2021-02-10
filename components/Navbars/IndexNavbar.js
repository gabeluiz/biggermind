import React from "react";
import Link from "next/link";
// components

import { signIn, signOut, useSession } from 'next-auth/client';

export default function Navbar(props) {

  const [session, loading] = useSession();

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="#pablo"
              >
                BiggerMind
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/biggermind"
                  target="_blank"
                >
                  <i className="lg:text-gray-300 text-gray-500 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Facebook</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.instagram.com/biggermind"
                  target="_blank"
                >
                  <i className="lg:text-gray-300 text-gray-500 fab fa-instagram text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Instagram</span>
                </a>
              </li>

              <li className="flex items-center">
                <a href="https://api.whatsapp.com/send?phone=+5541991152102&text=Olá,%20como%20funciona%20o%20serviço?"
                  target="_blank">
                  <button
                    className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fab fa-2x fa-whatsapp"></i> Orçamento
                  </button>
                </a>
              </li>
              {/* <li>
                <>
                {!session && <>
                  Not signed in <br/>
                  <button onClick={signIn('auth0',{ callbackUrl: 'http://localhost:3000/admin/dashboard' })}>Sign in</button>
                </>}
                {session && <>
                  Signed in as {session.user.email} <br/>
                  <button onClick={signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button>
                </>}
                </>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

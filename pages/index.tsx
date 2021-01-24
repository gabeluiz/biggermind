import "tailwindcss/tailwind.css";
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';

const NavItem = props => (
  <li>
    <a href={props.href} className="text-sm font-bold text-gray-700 px-2 py-1 hover:bg-gray-300 rounded transition-colors duration-300">
      {props.text}
    </a>
  </li>
)

const Home: NextPage = () => {
  const [session, loading] = useSession();
  return (
    <>
      <div className="container mx-auto">
        <Head>
          <link rel="shortcut icon" href="./favicon-16x16.png" />
        </Head>
        <nav className="flex justify-between p-4">
          <div className="flex items-center">
            <div className="inline-block h-6 w-6 rounded-full bg-gray-400" >
              <img className="object-contain md:object-scale-down rounded-full" src="./logo-biggermind.png" />
            </div>
            <span className="ml-2 font-white">BiggerMind</span>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-2">
              <NavItem href="/sobre" text="Sobre" />
              <NavItem href="/orcamento" text="Orçamento" />
              <NavItem href="/contato" text="Contato" />
              {!session && (
                <button onClick={():Promise<void> => signIn('auth0')}>Log In</button>
              )}
              {session && (
                <ul>
                <span>Logado: {session.user.email} </span>
                  <button onClick={():Promise<void> =>  signOut()}>  Sign out</button>
                </ul>
              )}
            </ul>
          </div>
        </nav>
        <div className="text-center md:text-left md:flex max-w-3xl mx-auto mt-12 md:mt-24 space-x-3">
          <h1 className="font-black text-6xl leading-tight">Sua empresa mais segura.</h1>
          <div className="space-y-3">
            <p className="text-xl font-light">
              Monitoramento por celular, computador ou tablet de onde você estiver, apenas com acesso a internet.
          </p>
            <form onSubmit={event => { event.preventDefault(); console.log("To do submit form") }}
              className="space-x-3">
              <input type="text" placeholder="Informe o seu e-mail..." className="bg-white rounded border border-gray-300 p-2" />
              <button type="submit" className="bg-red-400 text-white text-sm p-2 rounded border border-red-500">Solicitar orçamento</button>
            </form>
            <p className="text-gray-600 text-sm">Para comercios e residências.</p>
          </div>
        </div>
      </div>
    </>

    //<div>
    //  {!session && (
    //<div className="text-3xl">
    //  Not signed in <br/>
    //<button onClick={():Promise<void> => signIn('auth0')}>Sign in</button>
    //</div>
    //)}
    //{session && (
    //<div className="text-3xl">
    //  Signed in ass {session.user.email} <br/>
    //<button onClick={():Promise<void> =>  signOut()}>Sign out</button>
    //</div>
    // )}
    //</div>

  );
};

export default Home;
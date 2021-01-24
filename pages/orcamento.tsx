import "tailwindcss/tailwind.css";
import { NextPage } from 'next';

const Orcamento: NextPage = () => {
    return (
        <>
      <div className="container mx-auto">
        <div className="text-center md:text-left md:flex max-w-3xl mx-auto mt-12 md:mt-24 space-x-3">
          <h1 className="font-black text-6xl leading-tight">Página orçamento</h1>
        </div>
      </div>
    </>

    );

};

export default Orcamento;
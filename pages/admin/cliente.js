import React, { useEffect } from "react";

// components
import CardTableCliente from "components/Cards/CardTableCliente.js";

// layout for page
import Admin from "layouts/Admin.js";

export default function Cliente(props) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableCliente data={props.regsClienteResponse}/>
        </div>
      </div>
    </>
  );
}

Cliente.layout = Admin;

export async function getStaticProps() {
  const regsClienteResponse = await fetch('http://localhost:3000/api/cliente')
    .then(res => res.json())

    console.log(regsClienteResponse);
  return {
    props: {
      regsClienteResponse,
    }
  }
}

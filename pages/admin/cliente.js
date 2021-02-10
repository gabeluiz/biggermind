import React from "react";

// components

import CardTableCliente from "components/Cards/CardTableCliente.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Customers(props) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableCliente data={props.customersResponse}/>
        </div>
      </div>
    </>
  );
}

Customers.layout = Admin;

export async function getStaticProps() {
  const customersResponse = await fetch('http://127.0.0.1:3000/api/cliente')
    .then(res => res.json())

  return {
    props: {
      customersResponse,
    }
  }
}

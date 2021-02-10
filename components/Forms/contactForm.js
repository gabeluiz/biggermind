import React from 'react'

const contactForm = ({ data, item, onChange, register, errors, setValue, maskTelefone}) => {
    return (
        <>
            <h4 className="text-2xl font-semibold">
                Deseja o nosso serviço?
        </h4>
            <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                Complete esse formulário que responderemos você rapidamente.
        </p>
            <div className="relative w-full mb-3 mt-8">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name">
                    Nome completo
            </label>
                <input
                    type="text"
                    name="name"
                    ref={register({ required: "Nome é obrigatório.", maxLength: { value: 50, message: "Tamanho máximo é 50." } })}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="Nome completo" />
                {errors.name && <small className="text-red-500">{errors.name.message}</small>}
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email" >
                    E-mail
            </label>
                <input
                    type="text"
                    name="email"
                    ref={register({
                        required: "E-mail é obrigatório.", pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "E-mail inválido."
                        }
                    })}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="email@email.com" />
                {errors.email && <small className="text-red-500">{errors.email.message}</small>}
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="telefone">
                    Telefone
            </label>
                <input
                    type="tel"
                    name="telefone"
                    ref={register({maxLength: { value: 20, message: "Tamanho máximo é 20." }})}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="(00) 00000-0000" 
                    onChange={(e) =>
                        setValue("telefone", maskTelefone(e.target.value))
                      }/>
                {errors.telefone && <small className="text-red-500">{errors.telefone.message}</small>}
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="mensagem">
                    Mensagem
            </label>
                <textarea
                    rows="4"
                    cols="80"
                    ref={register({ required: "Mensagem é obrigatório.", maxLength: { value: 200, message: "Tamanho máximo é 200." } })}
                    name="mensagem"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Mensagem..." />
                {errors.telefone && <small className="text-red-500">{errors.mensagem.message}</small>}
            </div>
            <input
                    type="hidden"
                    name="status"
                    ref={register()} value="P"/>
        </>
    )
}

export default contactForm
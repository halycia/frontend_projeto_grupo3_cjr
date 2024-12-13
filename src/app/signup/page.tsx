import React from 'react';
import Link from 'next/link';

const Signup: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Imagem à esquerda */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://noticias.unb.br/images/Noticias/Fotos_frequentes/ICC/09mai2022_ICC_23_LGPrado.jpg')",
        }}
      ></div>

      {/* Formulário à direita */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Cadastro Usuário
          </h1>
          {/* Formulário */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Curso
              </label>
              <input
                type="text"
                id="course"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Departamento
              </label>
              <input
                type="text"
                id="department"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Criar Conta
            </button>
          </form>

          {/* Link para a página de login */}
          <div className="mt-6 text-center text-gray-700">
            <p>
              Já tem uma conta?{" "}
              <Link href="/login" className="text-green-500 hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

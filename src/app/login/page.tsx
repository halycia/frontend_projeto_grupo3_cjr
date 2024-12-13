import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://noticias.unb.br/images/Noticias/Fotos_frequentes/ICC/09mai2022_ICC_23_LGPrado.jpg')` }}></div>
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login</h1>
          {/* Formulário */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Entrar
            </button>
          </form>
          {/* Link para cadastro */}
          <div className="mt-6 text-center text-gray-700">
            <p>
              Não tem uma conta?{" "}
              <Link href="/signup" className="text-green-500 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


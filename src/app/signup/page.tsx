import React, { useState } from "react";
import Link from "next/link";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    department: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar a conta. Verifique os dados.");
      }

      const data = await response.json();
      setSuccessMessage("Conta criada com sucesso!");
      setFormData({ name: "", email: "", password: "", course: "", department: "" });
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                value={formData.name}
                onChange={handleChange}
                required
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
                value={formData.email}
                onChange={handleChange}
                required
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
                value={formData.password}
                onChange={handleChange}
                required
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
                value={formData.course}
                onChange={handleChange}
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
                value={formData.department}
                onChange={handleChange}
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

          {/* Mensagens de erro/sucesso */}
          {errorMessage && (
            <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 text-center">{successMessage}</p>
          )}

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
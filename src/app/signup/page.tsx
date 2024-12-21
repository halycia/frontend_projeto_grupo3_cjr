"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    curso: "",
    departamento: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setIsLoading(true);

    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      setIsLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      console.log(formData);
      const response = await api.post("/user", formData);
      if (!response) {
        throw new Error("Erro ao criar usuário");
      }

      router.push("/login");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://noticias.unb.br/images/Noticias/Fotos_frequentes/ICC/09mai2022_ICC_23_LGPrado.jpg')",
        }}
      ></div>
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Cadastro Usuário
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              id="nome"
              label="Nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              id="senha"
              label="Senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <InputField
              id="curso"
              label="Curso"
              type="text"
              value={formData.curso}
              onChange={handleChange}
            />
            <InputField
              id="departamento"
              label="Departamento"
              type="text"
              value={formData.departamento}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Criar Conta"}
            </button>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
          )}
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

const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}> = ({ id, label, type, value, onChange, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700"
      aria-label={label}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 mt-1 text-black bg-gray-100 border border-gray-300 rounded-lg"
    />
  </div>
);

export default Signup;

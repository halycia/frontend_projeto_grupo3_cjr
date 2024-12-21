import React, { useEffect, useState } from "react";
import { Dialog, Button } from "@headlessui/react";
import Image from "next/image";

import { inter400 } from "../../fonts/fonts";
import fotoPerfil from "../../../../public/imagens/perfil.png";

interface ModalEditarPerfilProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: string; // ID do usuário ou professor
  tipoPerfil: "user" | "professor"; // Define se é usuário ou professor
}

interface UsuarioPerfilProps {
  nome: string;
  email: string;
  curso?: string;
  departamento?: string;
  senha: string;
}

const ModalEditarPerfil: React.FC<ModalEditarPerfilProps> = ({
  isOpen,
  onClose,
  usuarioId,
  tipoPerfil,
}) => {
  const [usuario, setUsuario] = useState<UsuarioPerfilProps | null>(null);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [erroSenhaAtual, setErroSenhaAtual] = useState("");
  const [erroNovaSenha, setErroNovaSenha] = useState("");

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const endpoint =
          tipoPerfil === "user"
            ? `http://localhost:3000/user/${usuarioId}`
            : `http://localhost:3000/professor/${usuarioId}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Falha na requisição da API");
        }

        const data = await response.json();
        if (data) {
          setUsuario(data);
        } else {
          throw new Error("Dados inválidos recebidos");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil", error);
      }
    };

    if (usuarioId) fetchUsuarioData();
  }, [usuarioId, tipoPerfil]);

  const validarSenhaAtual = () => {
    if (!usuario) return;
    if (senhaAtual !== usuario?.senha) {
      setErroSenhaAtual("A senha atual está incorreta");
    } else {
      setErroSenhaAtual("");
    }
  };

  const validarNovaSenha = () => {
    if (novaSenha !== confirmarNovaSenha) {
      setErroNovaSenha("As senhas não coincidem");
    } else {
      setErroNovaSenha("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario) return;

    let erroAtual = "";
    let erroNova = "";

    if (senhaAtual !== usuario.senha) {
      erroAtual = "A senha atual está incorreta";
    }

    if (novaSenha && novaSenha !== confirmarNovaSenha) {
      erroNova = "As senhas não coincidem";
    }

    if (erroAtual || erroNova) {
      setErroSenhaAtual(erroAtual);
      setErroNovaSenha(erroNova);
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const nome = (form.elements.namedItem("nome") as HTMLInputElement)?.value;
    const curso = (form.elements.namedItem("curso") as HTMLInputElement)?.value;
    const departamento = (
      form.elements.namedItem("departamento") as HTMLInputElement
    )?.value;

    const updatedUser = {
      ...usuario,
      nome,
      curso,
      departamento,
      senha: novaSenha || usuario.senha,
    };

    try {
      const endpoint =
        tipoPerfil === "user"
          ? `http://localhost:3000/user/${usuarioId}`
          : `http://localhost:3000/professor/${usuarioId}`;
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar alterações");
      }

      console.log("Dados salvos com sucesso");
      onClose();
    } catch (error) {
      console.error("Erro ao salvar dados", error);
    }
  };

  if (!usuario) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
            <p>Carregando perfil...</p>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
          <Image
            src={fotoPerfil}
            alt="foto-perfil"
            className="rounded-full w-36 h-36 mx-auto object-cover sm:w-18 sm:h-18 mt-4"
          />

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                defaultValue={usuario.nome}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>
            {tipoPerfil === "user" && (
              <div className="mt-4">
                <input
                  type="text"
                  name="curso"
                  placeholder="Curso"
                  defaultValue={usuario.curso}
                  className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                />
              </div>
            )}
            {tipoPerfil === "professor" && (
              <div className="mt-4">
                <input
                  type="text"
                  name="departamento"
                  placeholder="Departamento"
                  defaultValue={usuario.departamento}
                  className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                />
              </div>
            )}
            <div className="mt-6 flex justify-center gap-2">
              <Button
                type="button"
                onClick={onClose}
                className={`bg-gray-200 rounded-full ${inter400.className} text-gray-700 border-2 w-36 h-9`}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={`bg-lightGreen rounded-full ${inter400.className} text-darkBlue border-2 w-36 h-9`}
              >
                Salvar
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalEditarPerfil;

import React, { useEffect, useState } from "react";
import { Dialog, Button } from "@headlessui/react";
import Image from "next/image";
import { inter400 } from "../../fonts/fonts";
import fotoPerfil from "../../../../public/imagens/perfil.png";
import api from "@/utils/api";

interface ModalEditarPerfilProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: string;
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
}) => {
  const [usuario, setUsuario] = useState<UsuarioPerfilProps | null>(null);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const response = await api.get(`/user/${usuarioId}`);
        if (!response) {
          throw new Error("Erro ao carregar dados do perfil");
        }
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil", error);
      }
    };

    if (usuarioId) fetchUsuarioData();
  }, [usuarioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario) return;

    const form = e.currentTarget as HTMLFormElement;
    const nome = (form.elements.namedItem("nome") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const curso = (form.elements.namedItem("curso") as HTMLInputElement)?.value;
    const departamento = (
      form.elements.namedItem("departamento") as HTMLInputElement
    )?.value;

    const updatedUser = {
      ...usuario,
      nome,
      email,
      curso,
      departamento,
      senha: novaSenha || usuario.senha,
    };

    try {
      const response = await api.patch(`/user/${usuarioId}`, updatedUser);
      if (!response) {
        throw new Error("Erro ao salvar dados");
      }

      console.log("Dados salvos com sucesso");
      onClose();
      window.location.reload();
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

            <div className="mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={usuario.email}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="curso"
                placeholder="Curso"
                defaultValue={usuario.curso}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <input
                type="text"
                name="departamento"
                placeholder="Departamento"
                defaultValue={usuario.departamento}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name="senhaAtual"
                placeholder="Senha Atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name="novaSenha"
                placeholder="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name="confirmarNovaSenha"
                placeholder="Confirmar Nova Senha"
                value={confirmarNovaSenha}
                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
              />
            </div>

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

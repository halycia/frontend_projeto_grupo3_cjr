import { useState } from "react";
import { inter500 } from "../fonts/fonts";
import Image from "next/image";
import fotoPerfil from "../../../public/imagens/perfil.png";
import dayjs from "dayjs";
import { FilePenLine, Trash2 } from "lucide-react";
import ModalEditarComentario from "./ModalComentario/ModalEditarComentario";
import { useAuth } from "../context/authContext";
import api from "@/utils/api";

interface ComentariosProps {
  conteudo: string;
  createdAt: string;
  id: number;
  usuarioId: number;
  avaliacaoId: number;
  onDelete: (id: number) => void; // Callback para exclusão
}

export default function Comentarios({
  conteudo,
  createdAt,
  id,
  usuarioId,
  avaliacaoId,

}: ComentariosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteComment = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await api.delete(`/comentarios/${id}`);

      if (response.status === 204) {
        alert("Comentário excluído com sucesso!");
        window.location.reload()
      }
    } catch (error) {
      alert("Erro ao excluir o comentário");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loggedUserId = userId ? parseInt(userId, 10) : null;

  return (
    <div className="bg-white flex justify-center flex-col w-full rounded-full p-1">
      <div className="flex items-center gap-2 ml-4">
        <div className="w-9 h-9">
          <Image src={fotoPerfil} alt="foto-perfil" className="rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <p className={`${inter500.className} text-black text-xs`}>
            Morty Gamer
          </p>
          <p className={`${inter500.className} text-lightGray text-xs`}>
            · {dayjs(createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-14 mb-4 border-b border-gray-300">
        <p className={`text-sm ${inter500.className} text-darkBlue`}>
          {conteudo}
        </p>
      </div>
      {loggedUserId === usuarioId && (
        <div className="flex ml-auto items-center gap-2 border-r-[30px] border-b-2 border-transparent">
          <FilePenLine
            size={20}
            onClick={openModal}
            className="cursor-pointer"
          />
          <Trash2
            size={20}
            onClick={handleDeleteComment}
            className="cursor-pointer"
          />
        </div>
      )}
      <ModalEditarComentario isOpen={isModalOpen} onClose={closeModal} comentarioId={id}/>
    </div>
  );
}

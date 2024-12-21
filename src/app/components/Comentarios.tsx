import { useState } from "react";
import { inter500 } from "../fonts/fonts";
import Image from "next/image";
import fotoPerfil from "../../../public/imagens/perfil.png";
import dayjs from "dayjs";
import { FilePenLine, Trash2 } from "lucide-react";
import ModalEditarComentario from "./ModalComentario/ModalEditarComentario";

interface ComentariosProps {
  conteudo: string;
  createdAt: string;
  usuarioId: number;
  avaliacaoId: number;
  id: number;
}

export default function Comentarios({
  conteudo,
  createdAt,
  id,
  usuarioId,
  avaliacaoId,
}: ComentariosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <div className="flex ml-auto items-center gap-2 border-r-[30px] border-b-2 border-transparent">
        <FilePenLine size={20} onClick={openModal} className="cursor-pointer" />
        <Trash2 size={20} />
      </div>
      <ModalEditarComentario isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

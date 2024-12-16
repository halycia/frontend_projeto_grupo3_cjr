import { FilePenLine, Trash2, MessageCircle } from "lucide-react";
import { inter500, inter900, inter400 } from "../fonts/fonts";
import fotoPerfil from "../../../public/imagens/perfil.png";
import Image from "next/image";
import { useState } from "react";
import Comentarios from "./Comentarios";
import dayjs from "dayjs";
dayjs.locale("pt-br");

interface PublicacaoProps {
  id: number;
  conteudo: string;
  createdAt: string;
  disciplinaId: number;
  professorId: number;
  updatedAt: string;
  usuarioId: number;
}

export default function Publicacao({
  conteudo,
  createdAt,
  professorId,
  usuarioId,
  disciplinaId,
  id,
}: PublicacaoProps) {
  const [comentariosVisiveis, setComentariosVisiveis] = useState(false);

  return (
    <div className="bg-darkGreen w-full h-auto max-w-screen-sm rounded-3xl p-4 gap-2 overflow-y-auto">
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <Image
              src={fotoPerfil}
              alt="foto-perfil"
              className="rounded-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className={`${inter900.className} text-black text-sm`}>
              Morty Gamer
            </p>
            <p className={`${inter400.className} text-lightGray text-sm`}>
              · {dayjs(createdAt).format("DD/MM/YY, HH:mm")} · {professorId} ·
              {disciplinaId}
            </p>
          </div>
        </div>
        <div className="flex  items-center w-auto h-auto text-ellipsis ml-16">
          <p
            className={`${inter500.className} text-darkBlue text-sm text-justify`}
          >
            {conteudo}
          </p>
        </div>
        <div className="flex w-[520px] h-fit ml-16 justify-between mt-2">
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => setComentariosVisiveis(!comentariosVisiveis)}
          >
            <MessageCircle size={20} />
            <p className={`${inter500.className} text-darkBlue text-sm`}>
              2 comentários
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FilePenLine size={20} />
            <Trash2 size={20} />
          </div>
        </div>

        {comentariosVisiveis && (
          <div className="mt-4 flex flex-col w-full gap-2">
            <Comentarios />
          </div>
        )}
      </div>
    </div>
  );
}

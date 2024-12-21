import { FilePenLine, Trash2, MessageCircle } from "lucide-react";
import { inter500, inter900, inter400 } from "../fonts/fonts";
import fotoPerfil from "../../../public/imagens/perfil.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Comentarios from "./Comentarios";
import ModalEditarAvaliacao from "./ModalAvaliacao/ModalEditarAvaliacao";
import dayjs from "dayjs";
import api from "@/utils/api";
import axios from "axios";
dayjs.locale("pt-br");

interface PublicacaoProps {
  id: number;
  conteudo: string;
  createdAt: string;
  disciplina: string;
  professor: string;
  updatedAt: string;
  usuarioId: number;
  usuario: string;
}

export default function Publicacao({
  conteudo,
  createdAt,
  professor,
  usuarioId,
  id,
  usuario,
  disciplina,
}: PublicacaoProps) {
  const [comentariosVisiveis, setComentariosVisiveis] = useState(false);
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await api.get(`/avaliacoes/${id}`);
      console.log(response.data);
      setComentarios([...response.data.comentarios]);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza de que deseja excluir esta avaliação?")) return;

    try {
      setIsDeleting(true);
      await api.delete(`/avaliacoes/${id}`);
      alert("Avaliação excluída com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir a avaliação:", error);
      alert("Erro ao excluir a avaliação.");
    } finally {
      setIsDeleting(false);
    }
  };

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
              {usuario}
            </p>
            <p className={`${inter400.className} text-lightGray text-sm`}>
              · {dayjs(createdAt).format("DD/MM/YY, HH:mm")} · {professor} ·
              {disciplina}
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
            onClick={() => {
              if (comentarios.length > 0)
                setComentariosVisiveis(!comentariosVisiveis);
            }}
          >
            <MessageCircle size={20} />
            <p className={`${inter500.className} text-darkBlue text-sm`}>
              {comentarios.length} comentários
            </p>
          </div>
          <div className="flex items-center gap-2">
          {isModalOpen && (
            <ModalEditarAvaliacao 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              avaliacaoId={id}
            />
          )}

          <FilePenLine
              size={20}
              className="cursor-pointer hover:text-green-500"
              onClick={() => setIsModalOpen(true)}
            />
            <Trash2
              size={20}
              className={`cursor-pointer hover:text-red-500 ${
                isDeleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={isDeleting ? undefined : handleDelete}
             />
          </div>
        </div>

        {comentariosVisiveis && (
          <div className="mt-4 flex flex-col w-full gap-2">
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <Comentarios
                  key={comentario.id}
                  id={comentario.id}
                  conteudo={comentario.conteudo}
                  createdAt={comentario.createdAt}
                  usuarioId={comentario.usuarioId}
                  avaliacaoId={comentario.publicacaoId}
                />
              ))
            ) : (
              <p className={`${inter500.className} text-darkBlue text-sm`}>
                Nenhum comentário
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

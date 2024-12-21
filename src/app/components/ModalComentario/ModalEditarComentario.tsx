import React, { useEffect, useState } from "react";
import { Dialog, Textarea } from "@headlessui/react";
import api from "@/utils/api";

interface ModalEditarComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  comentarioId: number; // ID do comentário a ser editado
}

const ModalEditarComentario: React.FC<ModalEditarComentarioProps> = ({
  isOpen,
  onClose,
  comentarioId,
}) => {
  const [textInput, setTextInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar o comentário ao abrir o modal
  useEffect(() => {
    const fetchComentario = async () => {
      if (isOpen) {
        try {
          setIsLoading(true);
          const response = await api.get(`/comentarios/${comentarioId}`);
          if (response.status === 200) {
            setTextInput(response.data.conteudo);
          }
        } catch (err) {
          setError("Erro ao carregar comentário.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchComentario();
  }, [isOpen, comentarioId]);

  // Função para salvar o comentário alterado
  const handleSave = async () => {
    if (textInput.trim()) {
      setIsLoading(true);
      try {
        const response = await api.patch(`/comentarios/${comentarioId}`, {
          conteudo: textInput,
        });

        if (response.status === 200) {
            window.location.reload()
          // Fechar o modal após sucesso
          onClose();
        }
      } catch (err) {
        setError("Erro ao salvar comentário.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-4/5 h-4/5 p-6 bg-darkGreen rounded-[29px] shadow-lg">
          <form>
            <div className="mb-4 py-5">
              {isLoading ? (
                <p className="text-white">Carregando...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <Textarea
                  name="comentario"
                  className="w-full min-h-[25rem] px-3 py-5 border rounded-[20px] bg-lightGreen focus:outline-none focus:ring-2 focus:ring-darkestGreen focus:border-transparent leading-tight resize-none overflow-y-auto"
                  placeholder="Digite seu comentário"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              )}
            </div>
          </form>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xl text-white bg-transparent hover:bg-green-500 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}  // Chama a função handleSave ao clicar em Salvar
              className="w-40 px-4 py-2 text-xl text-darkestGreen bg-lightGreen rounded-md rounded-br-xl hover:bg-middleGreen hover:text-white"
              disabled={isLoading || !textInput.trim()}
            >
              Salvar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalEditarComentario;

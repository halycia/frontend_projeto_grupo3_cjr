import React, { useState } from "react";
import { Dialog, Textarea } from "@headlessui/react";
import api from "@/utils/api";

interface ModalComentarioProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioId: number;
  avaliacaoId: number;
  textInput?: string; 
}

const ModalComentario: React.FC<ModalComentarioProps> = ({
  isOpen,
  onClose,
  usuarioId,
  avaliacaoId,
  textInput: initialTextInput = "", 
}) => {
  const [textInput, setTextInput] = useState<string>(initialTextInput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const comentarioData = {
      usuarioId,
      avaliacaoId,
      conteudo: textInput,
    };

    try {
      if (!textInput.trim()) {
        setMessage("O comentário não pode estar vazio.");
        return;
      }

      setIsLoading(true);

      const response = await api.post("/comentarios", comentarioData);

      if (response.status === 200) {
        console.log("Comentário criado com sucesso:", response.data);
        setMessage("Comentário salvo com sucesso.");
        setTextInput("");
      }
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      setMessage("Erro ao criar comentário.");
    } finally {
      setIsLoading(false);
      onClose(); 
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-4/5 h-4/5 p-6 bg-darkGreen rounded-[29px] shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 py-5">
              <Textarea
                name="comentario"
                className="w-full min-h-[25rem] px-3 py-5 border rounded-[20px] bg-lightGreen focus:outline-none focus:ring-2 focus:ring-darkestGreen focus:border-transparent leading-tight resize-none overflow-y-auto"
                placeholder="Digite seu comentário"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>

            {message && (
              <div className="text-center text-white mt-4">{message}</div>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xl text-white bg-transparent hover:bg-green-500 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-40 px-4 py-2 text-xl text-darkestGreen bg-lightGreen rounded-md rounded-br-xl hover:bg-middleGreen hover:text-white"
                disabled={isLoading || !textInput.trim()}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalComentario;


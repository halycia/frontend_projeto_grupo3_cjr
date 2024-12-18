import React from 'react';
import { Dialog, Textarea } from '@headlessui/react';

interface ModalComentarioProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalComentario: React.FC<ModalComentarioProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-4/5 h-4/5 p-6 bg-darkGreen rounded-[29px] shadow-lg">
                    <form>
                        <div className="mb-4 py-5">
                            <Textarea
                                name="comentario"
                                className="w-full min-h-[25rem] px-3 py-5 border rounded-[20px] bg-lightGreen focus:outline-none focus:ring-2 focus:ring-darkestGreen focus:border-transparent leading-tight resize-none overflow-y-auto"
                                placeholder="Digite seu comentário"
                            />
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
                            type="submit"
                            className="w-40 px-4 py-2 text-xl text-darkestGreen bg-lightGreen rounded-md rounded-br-xl hover:bg-middleGreen hover:text-white"
                        >
                            Salvar
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ModalComentario;

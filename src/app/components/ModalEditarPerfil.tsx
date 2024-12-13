import React from 'react';
import { Dialog, Button } from '@headlessui/react'
import Image from "next/image";

import {
    inter400,
} from "../fonts/fonts";
import fotoPerfil from "../../../public/imagens/perfil.png";

interface ModalEditarPerfilProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalEditarPerfil: React.FC<ModalEditarPerfilProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />


            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md p-6 bg-background rounded-lg shadow-lg">
                    <Image
                        src={fotoPerfil}
                        alt="foto-perfil"
                        className="rounded-full w-36 h-36 mx-auto object-cover sm:w-18 sm:h-18 mt-4"
                    />

                    <form>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Curso"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Departamento"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Senha atual"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Nova senha"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Confirmar nova senha"
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-6 flex justify-center gap-2">
                            <Button
                                type="button"
                                onClick={onClose}
                                className={`bg-gray-200 rounded-full ${inter400.className} text-gray-700 border-2 w-36 h-9
                                 border-darkBlue hover:shadow-inner hover:shadow-gray-500`}>Cancelar</Button>
                            <Button
                                type="submit"
                                className={`bg-lightGreen rounded-full ${inter400.className} text-darkBlue border-2 w-36 h-9
                                 border-darkBlue hover:shadow-inner hover:shadow-green-400`}>Salvar</Button>

                        </div>
                    </form>
                </Dialog.Panel>
            </div>
            |
        </Dialog>
    );
};

export default ModalEditarPerfil;
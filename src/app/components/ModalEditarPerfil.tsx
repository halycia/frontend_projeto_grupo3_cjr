import React, { useEffect, useState } from 'react';
import { Dialog, Button } from '@headlessui/react';
import Image from "next/image";

import { inter400 } from "../fonts/fonts";
import fotoPerfil from "../../../public/imagens/perfil.png";

interface ModalEditarPerfilProps {
    isOpen: boolean;
    onClose: () => void;
}

interface usuarioPerfilProps {
    nome: string;
    email: string;
    curso: string;
    departamento: string;
    senha: string;
}

const ModalEditarPerfil: React.FC<ModalEditarPerfilProps> = ({ isOpen, onClose }) => {
    const [usuario, setUsuario] = useState<usuarioPerfilProps | null>(null);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [erroSenhaAtual, setErroSenhaAtual] = useState('');
    const [erroNovaSenha, setErroNovaSenha] = useState('');

    const usuarioId = 3; // Supondo que o usuário esteja logado e seu id seja 1

    useEffect(() => {
        const fetchUsuarioData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${usuarioId}`);
                console.log('Status da resposta:', response.status);

                if (!response.ok) {
                    throw new Error('Falha na requisição da API');
                }

                const data = await response.json();

                if (data) {
                    setUsuario(data); // Define os dados recebidos no estado
                } else {
                    throw new Error('Dados inválidos recebidos');
                }
            } catch (error) {
                console.error('Erro ao carregar dados do perfil', error);
            }
        };

        fetchUsuarioData();
    }, [usuarioId]);

    const validarSenhaAtual = () => {
        if (!usuario) return;
        if (senhaAtual !== usuario?.senha) {
            setErroSenhaAtual('A senha atual está incorreta');
        } else {
            setErroSenhaAtual('');
        }
    };

    const validarNovaSenha = () => {
        if (novaSenha !== confirmarNovaSenha) {
            setErroNovaSenha('As senhas não coincidem');
        } else {
            setErroNovaSenha('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        let erroAtual = '';
        let erroNova = '';
    
        if (!usuario) {
            console.log('Erro: Usuário não carregado.');
            return;
        }
    
        if (senhaAtual !== usuario.senha) {
            erroAtual = 'A senha atual está incorreta';
        }
    
        if (novaSenha && novaSenha !== confirmarNovaSenha) {
            erroNova = 'As senhas não coincidem';
        }
    
        if (erroAtual || erroNova) {
            setErroSenhaAtual(erroAtual);
            setErroNovaSenha(erroNova);
            console.log('Senha inválida. Requisição recusada.');
            return;
        }
    
        const form = e.currentTarget as HTMLFormElement;
        const nome = (form.elements.namedItem('nome') as HTMLInputElement)?.value;
        const curso = (form.elements.namedItem('curso') as HTMLInputElement)?.value;
        const departamento = (form.elements.namedItem('departamento') as HTMLInputElement)?.value;
    
        const updatedUser = {
            ...usuario,
            nome,
            curso,
            departamento,
            senha: novaSenha || usuario.senha,
        };
    
        try {
            const response = await fetch(`http://localhost:3000/user/${usuarioId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao salvar alterações');
            }
    
            console.log('Dados salvos com sucesso');
            onClose();
        } catch (error) {
            console.error('Erro ao salvar dados', error);
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
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
                                readOnly
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
                                placeholder="Senha atual"
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                                onBlur={validarSenhaAtual}
                            />
                            {erroSenhaAtual && <p className="text-darkRed text-sm">{erroSenhaAtual}</p>}
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Confirmar nova senha"
                                value={confirmarNovaSenha}
                                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                                className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring"
                                onBlur={validarNovaSenha}
                            />
                            {erroNovaSenha && <p className="text-darkRed text-sm">{erroNovaSenha}</p>}
                        </div>
                        <div className="mt-6 flex justify-center gap-2">
                            <Button
                                type="button"
                                onClick={onClose}
                                className={`bg-gray-200 rounded-full ${inter400.className} text-gray-700 border-2 w-36 h-9
                                 border-darkBlue hover:shadow-inner hover:shadow-gray-500`}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className={`bg-lightGreen rounded-full ${inter400.className} text-darkBlue border-2 w-36 h-9
                                 border-darkBlue hover:shadow-inner hover:shadow-green-400`}>
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

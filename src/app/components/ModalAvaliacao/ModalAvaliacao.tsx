import React, { useState, useEffect } from 'react';
import { Dialog, Combobox, Textarea } from '@headlessui/react';

interface ModalAvaliacaoProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalAvaliacao: React.FC<ModalAvaliacaoProps> = ({ isOpen, onClose }) => {
    const [selectedProfessor, setSelectedProfessor] = useState<string | null>(null);
    const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);
    const [textInput, setTextInput] = useState<string>('');
    const [searchProfessor, setSearchProfessor] = useState<string>('');
    const [searchDisciplina, setSearchDisciplina] = useState<string>('');
    const [professores, setProfessores] = useState<{ id: number; nome: string }[]>([]);
    const [disciplinas, setDisciplinas] = useState<{ id: number; nome: string }[]>([]);

    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const response = await fetch('http://localhost:3000/professores');
                if (!response.ok) throw new Error('Erro ao buscar professores');
                const data = await response.json();
                setProfessores(data);
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        };

        const fetchDisciplinas = async () => {
            try {
                const response = await fetch('http://localhost:3000/disciplinas');
                if (!response.ok) throw new Error('Erro ao buscar disciplinas');
                const data = await response.json();
                setDisciplinas(data);
            } catch (error) {
                console.error('Erro ao buscar disciplinas:', error);
            }
        };

        fetchProfessores();
        fetchDisciplinas();
    }, []);

    const filteredProfessores = professores.filter(professor =>
        professor.nome.toLowerCase().includes(searchProfessor.toLowerCase())
    );
    const filteredDisciplinas = disciplinas.filter(disciplina =>
        disciplina.nome.toLowerCase().includes(searchDisciplina.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const avaliacaoData = {
            usuarioId: 3,
            professorId: selectedProfessor ? professores.find(p => p.nome === selectedProfessor)?.id : null,
            disciplinaId: selectedDisciplina ? disciplinas.find(d => d.nome === selectedDisciplina)?.id : null,
            conteudo: textInput,
        };

        try {
            const response = await fetch('http://localhost:3000/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(avaliacaoData),
            });

            if (!response.ok) {
                throw new Error('Erro ao criar avaliação');
            }

            const data = await response.json();
            console.log('Avaliação criada com sucesso:', data);
            onClose();
        } catch (error) {
            console.error('Erro ao criar avaliação:', error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-4/5 h-4/5 p-6 bg-darkGreen rounded-[29px] shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Combobox value={selectedProfessor} onChange={(value) => {
                                setSelectedProfessor(value);
                                setSearchProfessor(value || '');
                            }}>
                                <div className="relative">
                                    <Combobox.Input
                                        className="w-full h-[3rem] px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                        placeholder={selectedProfessor ? "" : "Professor(a)"}
                                        onChange={(e) => setSearchProfessor(e.target.value)}
                                        value={searchProfessor || selectedProfessor || ''}
                                    />
                                    {searchProfessor && (
                                        <Combobox.Options className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border">
                                            {filteredProfessores.map((professor) => (
                                                <Combobox.Option key={professor.id} value={professor.nome}>
                                                    {({ active, selected }) => (
                                                        <div
                                                            className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : ''} ${selected ? 'bg-green-500 text-white' : ''}`}
                                                        >
                                                            {professor.nome}
                                                        </div>
                                                    )}
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    )}
                                </div>
                            </Combobox>
                        </div>

                        <div className="mb-4">
                            <Combobox value={selectedDisciplina} onChange={(value) => {
                                setSelectedDisciplina(value);
                                setSearchDisciplina(value || '');
                            }}>
                                <div className="relative">
                                    <Combobox.Input
                                        className="w-full h-[3rem] px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                        placeholder={selectedDisciplina ? "" : "Disciplina"}
                                        onChange={(e) => setSearchDisciplina(e.target.value)}
                                        value={searchDisciplina || selectedDisciplina || ''}
                                    />
                                    {searchDisciplina && (
                                        <Combobox.Options className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border">
                                            {filteredDisciplinas.map((disciplina) => (
                                                <Combobox.Option key={disciplina.id} value={disciplina.nome}>
                                                    {({ active, selected }) => (
                                                        <div
                                                            className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : ''} ${selected ? 'bg-green-500 text-white' : ''}`}
                                                        >
                                                            {disciplina.nome}
                                                        </div>
                                                    )}
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    )}
                                </div>
                            </Combobox>
                        </div>

                        <div className="mb-4">
                            <Textarea
                                name="avaliacao"
                                className="w-full min-h-[20rem] px-3 py-5 border rounded-[20px] bg-lightGreen focus:outline-none focus:ring-2 focus:ring-darkestGreen focus:border-transparent leading-tight resize-none overflow-y-auto"
                                placeholder="Digite sua avaliação aqui"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                            />
                        </div>

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
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ModalAvaliacao;

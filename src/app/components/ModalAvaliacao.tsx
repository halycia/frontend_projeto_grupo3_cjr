import React, { useState } from 'react';
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

    const professores = ['Option 1', 'Option 11', 'Option 111', 'Professor A', 'Professor B', 'Professor C'];
    const disciplinas = ['Choice A', 'Choice B', 'Choice C'];

    const filteredProfessores = professores.filter(option =>
        option.toLowerCase().includes(searchProfessor.toLowerCase())
    );
    const filteredDisciplinas = disciplinas.filter(option =>
        option.toLowerCase().includes(searchDisciplina.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-4/5 h-4/5 p-6 bg-darkGreen rounded-[29px] shadow-lg">
                    <form>
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
                                        value={searchProfessor}
                                    />
                                    {searchProfessor && (
                                        <Combobox.Options className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border">
                                            {filteredProfessores.map((option) => (
                                                <Combobox.Option key={option} value={option}>
                                                    {({ active, selected }) => (
                                                        <div
                                                            className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : ''} ${selected ? 'bg-green-500 text-white' : ''}`}
                                                        >
                                                            {option}
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
                                        value={searchDisciplina}
                                    />
                                    {searchDisciplina && (
                                        <Combobox.Options className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border">
                                            {filteredDisciplinas.map((option) => (
                                                <Combobox.Option key={option} value={option}>
                                                    {({ active, selected }) => (
                                                        <div
                                                            className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : ''} ${selected ? 'bg-green-500 text-white' : ''}`}
                                                        >
                                                            {option}
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
                                className="w-full min-h-[20rem] px-3 py-2 border rounded-[20px] bg-lightGreen focus:outline-none focus:ring-2 focus:ring-darkestGreen focus:border-transparent leading-tight resize-none overflow-y-auto"
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

"use client";
import Header from "../components/Header";
import IconeProfessor from "../components/IconeProfessor";
import Image from "next/image";
import Lupa from "../../../public/imagens/lupa.svg";
import Ordenar from "../../../public/imagens/ordenar.svg";
import Publicacao from "../../../public/imagens/publicacaonova.svg";
import ModalAvaliacao from "../components/ModalAvaliacao/ModalAvaliacao";
import { Button } from "@headlessui/react";
import { useEffect } from "react";
import api from "@/utils/api";
import { useState } from "react";
import { Professores } from "../feed-deslogado/page";
import ListaProfessoresRecentes from "../components/ListaProfessoresRecentes";

const FeedLogado = () => {
    const [professores, setProfessores] = useState<Professores[]>([]);
    const [filteredProfessores, setFilteredProfessores] = useState<Professores[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortCriteria, setSortCriteria] = useState("nome"); 
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false); 
  
    useEffect(() => {
      async function getProfessores() {
        try {
          const response = await api.get("/professores");
          if (response) {
            setProfessores(response.data);
            setFilteredProfessores(response.data);
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (loading) {
        getProfessores();
      }
    }, [loading]);
  
    useEffect(() => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = professores.filter((professor) =>
        professor.nome.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProfessores(filtered);
    }, [searchTerm, professores]);
  
    useEffect(() => {
      const sorted = [...filteredProfessores].sort((a, b) => {
        if (sortCriteria === "nome") {
          return a.nome.localeCompare(b.nome);
        } else if (sortCriteria === "materia") {
          return a.departamento.localeCompare(b.departamento);
        } else if (sortCriteria === "recentes") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortCriteria === "antigas") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
      setFilteredProfessores(sorted);
    }, [sortCriteria, professores]);

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

    const handleOpenModal = () => {
        setIsModalOpen(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Fecha o modal
    };
  
    return (
      <>
        <div className="w-screen h-screen">
          <Header/>
  
          <div className="flex items-center justify-between w-full p-4 rounded-lg bg-white">
            <h1 className="font-questrial font-normal text-3xl sm:text-4xl leading-[37.08px] text-center sm:ml-20">
              Novos Professores
            </h1>
          </div>
  
          <div className="flex items-center justify-center w-full p-4 rounded-lg bg-white">
            <ListaProfessoresRecentes />
          </div>
  
          <div className="flex justify-center items-center">
            <div className="w-[1184px] h-[4px] bg-black mt-8 mb-8"></div>
          </div>
  
          <div className="flex items-center justify-between w-full p-4 rounded-lg bg-white">
            <h1 className="font-questrial font-normal text-3xl sm:text-4xl leading-[37.08px] text-center sm:ml-20">
              Todos Professores
            </h1>
  
            <div className="relative w-full sm:w-[535px] h-[68px] bg-gray-200 rounded-full overflow-hidden flex items-center">
              <input
                type="text"
                className="w-full h-full pl-12 pr-12 text-sm text-gray-700 bg-transparent rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder:text-xl placeholder:text-gray-500"
                placeholder="Buscar Professor(a)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Image src={Lupa} alt="Ícone de Busca" width={25} height={25} />
              </div>
            </div>

            <button
                className="bg-green-500 text-white px-12 py-6 rounded-full"
                onClick={handleOpenModal}
            >
                Nova Publicação
            </button>

            {isModalOpen && (
                <ModalAvaliacao
                    isOpen={isModalOpen}
                    onClose={handleCloseModal} // Passa a função de fechar
            />
            )}

            <div className="relative mr-3">
              <button
                className="bg-blue-500 text-white px-8 py-6 rounded-full"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                Ordenar
              </button>
  
              {isSortMenuOpen && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg w-40 z-10">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortCriteria("nome");
                      setIsSortMenuOpen(false);
                    }}
                  >
                    Nome
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortCriteria("materia");
                      setIsSortMenuOpen(false);
                    }}
                  >
                    Departamento
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortCriteria("recentes");
                      setIsSortMenuOpen(false);
                    }}
                  >
                    Recentes
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortCriteria("antigas");
                      setIsSortMenuOpen(false);
                    }}
                  >
                    Antigas
                  </div>
                </div>
              )}
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white">
            {filteredProfessores.map((professor) => (
              <IconeProfessor
                key={professor.id}
                nome={professor.nome}
                departamento={professor.departamento}
              />
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default FeedLogado;
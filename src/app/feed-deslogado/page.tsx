"use client";
import HeaderDeslogado from "../components/HeaderDeslogado";
import IconeProfessor from "../components/IconeProfessor";
import ListaProfessoresRecentes from "../components/ListaProfessoresRecentes";
import Image from "next/image";
import Lupa from "../../../public/imagens/lupa.svg";
import Ordenar from "../../../public/imagens/ordenar.svg";

import { Button } from "@headlessui/react";
import { useEffect } from "react";
import api from "@/utils/api";
import { useState } from "react";

export interface Professores {
  id: number;
  nome: string;
  departamento: string;
  createdAt: Date; 
  updatedAt: Date; 
}

const feedDeslogado = () => {
  const[professores,setProfessores] = useState<Professores[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfessores() {
      try{
        const response = await api.get("/professores");
        if(response){
          setProfessores(response.data);
          setLoading(false);
        }
      } catch(err){
        console.error(err);
      }
    }
    if(loading){
      getProfessores();
    }
  }, [loading]);

  return (
    <>
      <div className="w-screen h-screen">
        <HeaderDeslogado />

        <div className="flex items-center justify-between w-full p-4 rounded-lg bg-white">
          <h1 className="font-questrial font-normal text-3xl sm:text-4xl leading-[37.08px] text-center sm:ml-20">
            Novos Professores
          </h1>

          <div className="relative w-full sm:w-[535px] h-[68px] bg-gray-200 rounded-full overflow-hidden flex items-center">
            <input
              type="text"
              className="w-full h-full pl-12 pr-12 text-sm text-gray-700 bg-transparent rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder:text-xl placeholder:text-gray-500"
              placeholder="Buscar Professor(a)"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Image src={Lupa} alt="Ícone de Busca" width={25} height={25} />
            </div>
          </div>
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

          <div className="w-[200px] h-[70px] flex items-center justify-center mr-[200px]">
            <Button>
              <Image
                src={Ordenar}
                alt="botão-de-ordenar"
                className="w-full object-cover "
              />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center w-full p-4 rounded-lg bg-white">
          {professores.map((professor) => (
            <IconeProfessor key={professor.id} nome={professor.nome} departamento={professor.departamento} />
          ))}
        </div>
      </div>
    </>
  );
};

export default feedDeslogado;

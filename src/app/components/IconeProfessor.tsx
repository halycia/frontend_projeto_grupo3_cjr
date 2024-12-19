import React from "react";
import Image from "next/image";
import Professor from "../../../public/imagens/professor.svg";

interface IconeProfessorProps {
  nome: string;
  departamento: string;
}

const IconeProfessor : React.FC<IconeProfessorProps> = ({ nome, departamento }) => {
  return (
    <div className="w-[236px] h-[281px] mx-10 mt-5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-start p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <Image
        src={Professor}
        alt="Imagem do Professor"
        className="w-[185px] h-[185px] object-cover"
      />
      <h2 className="text-lg font-medium text-gray-800">{nome}</h2>
      <h3 className="text-sm text-gray-500">{departamento}</h3>
    </div>
  );
};

export default IconeProfessor;

"use client";
import React, { createContext, useContext, useState } from "react";

interface Professor {
  id: number;
  nome: string;
  disciplina: string;
}

interface ProfessorContextProps {
  professores: Professor[];
  setProfessores: (professores: Professor[]) => void;
}

const ProfessorContext = createContext<ProfessorContextProps | undefined>(
  undefined
);

export const ProfessorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [professores, setProfessores] = useState<Professor[]>([]);

  return (
    <ProfessorContext.Provider value={{ professores, setProfessores }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export const useProfessorContext = () => {
  const context = useContext(ProfessorContext);
  if (!context) {
    throw new Error(
      "useProfessorContext deve ser usado dentro de um ProfessorProvider"
    );
  }
  return context;
};

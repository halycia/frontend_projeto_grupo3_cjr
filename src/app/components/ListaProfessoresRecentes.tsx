"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { Professores } from "../feed-deslogado/page";
import IconeProfessor from "../components/IconeProfessor";

function obterProfessoresMaisRecentes(
  professores: Professores[]
): Professores[] {
  return professores
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);
}

const ListaProfessoresRecentes: React.FC = () => {
  const [professores, setProfessores] = useState<Professores[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfessores() {
      try {
        const response = await api.get("/professores");
        if (response) {
          const professoresRecentes = obterProfessoresMaisRecentes(
            response.data
          );
          setProfessores(professoresRecentes);
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full p-4 rounded-lg bg-white">
      {professores.map((professor) => (
        <IconeProfessor
          key={professor.id}
          nome={professor.nome}
          departamento={professor.departamento}
          id={professor.id}
        />
      ))}
    </div>
  );
};

export default ListaProfessoresRecentes;

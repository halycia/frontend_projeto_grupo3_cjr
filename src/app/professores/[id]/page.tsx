"use client";

import { Building, Dot, LibraryBig, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

import Header from "../../components/Header";
import { inter400, inter700, inter800 } from "../../fonts/fonts";
import "../../globals.css";
import professorFoto from "../../../../public/imagens/rick.svg";
import Publicacao from "../../components/Publicacao";
import ModalEditarPerfil from "../../components/ModalPerfil/ModalEditarPerfil";
import { CircleArrowLeft } from "lucide-react";
import api from "@/utils/api";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import HeaderDeslogado from "@/app/components/HeaderDeslogado";

export default function PerfilLogadoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avaliacao, setAvaliacao] = useState<any[]>([]);
  const [professor, setProfessor] = useState<any>();
  const { userId, isAuthenticated } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { id } = useParams();
  const router = useRouter();

  const handleBackClick = () => {
    if (isAuthenticated) {
      router.push("/feed-logado"); 
    } else {
      router.push("/"); 
    }
  };

  console.log(professor);
  console.log(avaliacao);
  useEffect(() => {
    if (id) {
      fetchAvaliacoes();
    }
  }, [id]);
  const fetchAvaliacoes = async () => {
    if (!id) {
      console.error("Professor não encontrado");
      return;
    }
    try {
      if (id) {
        const response = await api.get(`avaliacoes/professor/${id}`);
        const professor = await api.get(`professores/${id}`);
        console.log(response.data);
        console.log(professor.data);
        setAvaliacao(response.data);
        setProfessor(professor.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-background flex flex-col justify-center items-center h-full w-screen relative">
      {isAuthenticated ? <Header /> : <HeaderDeslogado />}
      <div className="flex items-center w-full h-[30px]">
        <Button className="focus:outline-none rounded-full hover:bg-emerald-300 ml-20" onClick={handleBackClick}>
          <CircleArrowLeft size={50} />    
        </Button>
      </div>
      <div className="bg-white flex flex-col shadow-md shadow-gray-500 items-center h-full w-[90%] max-w-screen-md sm:w-[80%] lg:w-[646px]">
        <div className="h-auto w-full">
          <div className="h-[151px] bg-darkGreen shadow shadow-gray-500 flex relative">
            <Image
              src={professorFoto}
              alt="foto-perfil"
              className="rounded-full w-32 h-32  absolute left-12 top-16 object-cover sm:w-18 sm:h-18"
            />
          </div>
          <div
            className={`bg-white mt-12 h-auto border-solid border-b-2 w-full flex flex-col justify-around ${inter700.className}`}
          >
            <div className="flex flex-col ml-12 gap-2 sm:ml-2">
              <h1 className="text-darkBlue text-xl sm:text-lg lg:text-2xl">
                {professor?.nome}
              </h1>
              <div className="flex items-center gap-1">
                <Building size={16} />
                <p className={`text-darkBlue text-sm ${inter400.className}`}>
                  Dept. {professor?.departamento}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LibraryBig size={16} />
                <div className={`${inter400.className} text-sm text-darkBlue`}>
                  {professor?.disciplinas.map(
                    (disciplina: { id: number; nome: string }) => (
                      <p key={disciplina.id}>{disciplina.nome}</p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-full flex flex-col p-2 gap-4">
          <div className={`text-black ${inter800.className}`}>Publicações</div>`
          {avaliacao ? (
            avaliacao.map((avaliacao) => (
              <Publicacao
                key={avaliacao.id}
                conteudo={avaliacao.conteudo}
                id={avaliacao.id}
                createdAt={avaliacao.createdAt}
                usuarioId={avaliacao.usuarioId}
                professor={
                  avaliacao.professor.nome || "Professor não identificado"
                }
                updatedAt={avaliacao.updatedAt}
                disciplina={
                  avaliacao.disciplina.nome || "Disciplina não identificada"
                }
                usuario={avaliacao.usuario.nome || "Usuário não identificado"}
              />
            ))
          ) : (
            <p> Nenhuma avaliação encontrada</p>
          )}
          `
        </div>
        <div className="flex items-center justify-center">
          <Dot />
        </div>
      </div>
    </div>
  );
}
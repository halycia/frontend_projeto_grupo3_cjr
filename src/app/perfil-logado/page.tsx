import { Building, Mail } from "lucide-react";
import Header from "../components/Header";
import { inter400, inter700 } from "../fonts/fonts";
import "../globals.css";
import fotoPerfil from "../../../public/imagens/perfil.png";
import Image from "next/image";
import { Button } from "@headlessui/react";
export default function PerfilLogadoPage() {
  return (
    <div className="bg-background flex flex-col justify-center items-center h-screen w-screen relative">
      <Header />
      <div className="bg-white mt-[99px] flex flex-col shadow-md shadow-gray-500 items-center h-full w-[646px]">
        <div className="h-[346px] w-full">
          <div className="h-[151px] bg-darkGreen shadow shadow-gray-500 flex relative">
            <Image
              src={fotoPerfil}
              alt="foto-perfil"
              className="rounded-full w-36 h-36 absolute left-12 top-16"
            />
          </div>
          <div
            className={`bg-white h-[195px] border-solid border-b-2 w-full flex flex-col justify-around ${inter700.className}`}
          >
            <div className="flex flex-col items-end mr-4 gap-1">
              <Button
                className={`bg-lightGreen rounded-full ${inter400.className} text-darkBlue border-2 w-36 h-9
                 border-darkBlue hover:shadow-inner hover:shadow-green-400`}
              >
                Editar Perfil
              </Button>
              <Button
                className={`bg-red rounded-full ${inter400.className} text-darkBlue border-2 w-36 h-9
                 border-darkBlue hover:shadow-inner hover:shadow-rose-400`}
              >
                Excluir Perfil
              </Button>
            </div>
            <div className="flex flex-col ml-12 gap-2">
              <h1 className="text-darkBlue text-xl">Morty Gamer</h1>
              <div className="flex items-center gap-1">
                <Building size={16} />
                <p className={`text-darkBlue text-sm ${inter400.className}`}>
                  Ciência da Computação / Dept. Ciência da Computação
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <p className={`${inter400.className} text-sm text-darkBlue`}>
                  Morty.gamer.23@cjr.org.br
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-full"></div>
      </div>
    </div>
  );
}

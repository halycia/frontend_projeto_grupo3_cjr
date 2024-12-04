import {
  Building,
  FilePenLine,
  Mail,
  MessageCircle,
  Trash2,
} from "lucide-react";
import Header from "../components/Header";
import {
  inter400,
  inter500,
  inter700,
  inter800,
  inter900,
} from "../fonts/fonts";
import "../globals.css";
import fotoPerfil from "../../../public/imagens/perfil.png";
import Image from "next/image";
import { Button } from "@headlessui/react";
export default function PerfilLogadoPage() {
  return (
    <div className="bg-background flex flex-col justify-center items-center h-screen w-screen relative">
      <Header />
      <div className="bg-white mt-[120px] flex flex-col shadow-md shadow-gray-500 items-center h-full w-[646px]">
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
        <div className="bg-white w-full h-full flex flex-col p-2">
          <div className={`text-black ${inter800.className}`}>Publicações</div>
          <div className="bg-darkGreen w-[630px] h-[182px] rounded-3xl p-4 gap-2">
            <div className="w-[520] flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-[48px] h-[48px]">
                  <Image
                    src={fotoPerfil}
                    alt="foto-perfil"
                    className="rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className={`${inter900.className} text-black text-sm`}>
                    Morty Gamer
                  </p>
                  <p className={`${inter400.className} text-lightGray text-sm`}>
                    · 17/04/2024, às 21:42 · João Frango · Surf
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center w-[520px] h-[74px] text-ellipsis ml-16">
                <p
                  className={`${inter500.className} text-darkBlue text-sm text-justify`}
                >
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin
                </p>
              </div>
              <div className="flex w-[520px] h-fit ml-16 justify-between mt-2">
                <div className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  <p className={`${inter500.className} text-darkBlue text-sm`}>
                    2 comentários
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FilePenLine size={20} />
                  <Trash2 size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

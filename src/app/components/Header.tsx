import Image from "next/image";
import unbPic from "../../../public/imagens/unb.png";
import perfilFoto from "../../../public/imagens/perfil.png";
import sairImagem from "../../../public/imagens/sair.png";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
export default function Header() {
  return (
    <nav className="h-[99px] w-screen relative inset-y-0 left-0 bg-lightGreen flex justify-between items-center mb-[40px] z-40 shadow shadow-gray-500 ">
      <div className=" w-[150px] ml-10 flex justify-center items-center gap-4">
        <Image src={unbPic} alt="unb" width={92} height={46} />
      </div>
      <div className="w-[280px] h-[90px] flex justify-around items-center">
        <Button className="inline-flex items-center gap-2 rounded-full  py-1.5 px-3 text-sm/6 font-semibold  focus:outline-none  data-[hover]:bg-emerald-300 data-[open]:bg-teal-600 data-[open]: outline-1">
          <BellAlertIcon width={45} height={45} color="black" />
        </Button>

        <div className="flex justify-around w-[140px] items-center">
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
            <Button>
              <Image
                src={perfilFoto}
                alt="foto-perfil"
                className="w-full object-cover"
              />
            </Button>
          </div>
          <div className=" ">
            <Button className="inline-flex items-center gap-2 rounded-full  py-1.5 px-3 text-sm/6 font-semibold  focus:outline-none  data-[hover]:bg-emerald-300 data-[open]:bg-teal-600 data-[open]: outline-1">
              <Image
                src={sairImagem}
                alt="sairImagem"
                className="w-[40px] h-[40px]"
              />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

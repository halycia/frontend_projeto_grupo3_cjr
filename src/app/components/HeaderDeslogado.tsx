import Image from "next/image";
import unbPic from "../../../public/imagens/unb.png";
import login from "../../../public/imagens/login.png";
import { Button } from "@headlessui/react";
import { CircleArrowLeft } from "lucide-react";
export default function HeaderDeslogado() {
  return (
    <nav className="h-[99px] w-screen relative inset-y-0 left-0 bg-lightGreen mb-[40px] flex justify-between items-center z-40 shadow shadow-gray-500">
      <div className=" w-[120px] ml-10 flex justify-center items-center gap-4">
        <Image src={unbPic} alt="unb" width={92} height={46} />
        <Button className="focus:outline-none rounded-full data-[hover]:bg-emerald-300 data-[open]:bg-teal-600 data-[open]: outline-1">
          <CircleArrowLeft size={50} />
        </Button>
      </div>
      <div className="w-[280px] h-[90px] flex justify-around items-center">
        <div className="flex justify-around w-[140px] items-center">
          <div className="w-[154px] h-[55px] overflow-hidden">
            <Button>
              <Image
                src={login}
                alt="botão-de-login"
                className="w-full object-cover"
              />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

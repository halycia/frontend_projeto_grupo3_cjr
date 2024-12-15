import { inter500, inter400, inter900 } from "../fonts/fonts";
import Image from "next/image";
import fotoPerfil from "../../../public/imagens/perfil.png";
export default function Comentarios() {
  return (
    <div className="bg-white flex justify-center flex-col w-full rounded-full p-1">
      <div className="flex items-center gap-2 ml-4">
        <div className="w-9 h-9 ">
          <Image src={fotoPerfil} alt="foto-perfil" className="rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <p className={`${inter500.className} text-black text-xs`}>
            Morty Gamer
          </p>
          <p className={`${inter500.className} text-lightGray text-xs`}>
            · 17/04/2024, às 21:42
          </p>
        </div>
      </div>
      <div className=" flex items-center gap-2 ml-14 mb-4">
        <p className={`text-sm ${inter500.className} text-darkBlue  `}>
          Não tenho culpa de nada!
        </p>
      </div>
    </div>
  );
}

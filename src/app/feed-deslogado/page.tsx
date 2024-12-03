import HeaderDeslogado from "../components/HeaderDeslogado";
import Image from "next/image";
import Lupa from "../../../public/imagens/lupa.svg";

const perfilDeslogado = () => {
  return (
    <>
    <div className="w-screen h-screen">
        <HeaderDeslogado/>

        <div className="flex items-center justify-between w-full p-4 rounded-lg bg-white">
           <h1 className="font-questrial font-normal text-3xl sm:text-4xl leading-[37.08px] text-center sm:ml-20">Novos Professores</h1>

           <div className="relative w-full sm:w-[535px] h-[68px] bg-gray-200 rounded-full overflow-hidden flex items-center">
                <input type="text" className="w-full h-full pl-12 pr-12 text-sm text-gray-700 bg-transparent rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder:text-xl placeholder:text-gray-500" placeholder="Buscar Professor(a)"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Image src={Lupa} alt="Ícone de Busca" width={25} height={25} />
                </div> 

           </div>

           
        </div>

    
        

        

    </div>

 
    


    

    

    </>
  );
};

export default perfilDeslogado;

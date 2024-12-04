import HeaderDeslogado from "../components/HeaderDeslogado";
import Image from "next/image";
import Lupa from "../../../public/imagens/lupa.svg";
import Professor from "../../../public/imagens/professor.svg";

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

        <div className="flex items-center justify-center w-full p-4 rounded-lg bg-white">
            <div className= "w-[236px] h-[281px] mx-10 mt-5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-start p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <Image src={Professor} alt="Imagem do Professor" className="w-[185px] h-[185px] object-cover"/>
                <h2 className="text-lg font-medium text-gray-800">Nome</h2>
                <h3 className="text-sm text-gray-500">Disciplina</h3>
            </div>

            <div className= "w-[236px] h-[281px] mx-10 mt-5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-start p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <Image src={Professor} alt="Imagem do Professor" className="w-[185px] h-[185px] object-cover"/>
                <h2 className="text-lg font-medium text-gray-800">Nome</h2>
                <h3 className="text-sm text-gray-500">Disciplina</h3>
            </div>

            <div className= "w-[236px] h-[281px] mx-10 mt-5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-start p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <Image src={Professor} alt="Imagem do Professor" className="w-[185px] h-[185px] object-cover"/>
                <h2 className="text-lg font-medium text-gray-800">Nome</h2>
                <h3 className="text-sm text-gray-500">Disciplina</h3>
            </div>

            <div className= "w-[236px] h-[281px] mx-10 mt-5 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-start p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <Image src={Professor} alt="Imagem do Professor" className="w-[185px] h-[185px] object-cover"/>
                <h2 className="text-lg font-medium text-gray-800">Nome</h2>
                <h3 className="text-sm text-gray-500">Disciplina</h3>
            </div>
        </div>

        <div className="flex justify-center items-center">
            <div className="w-[1184px] h-[4px] bg-black mt-8"></div>
        </div>

        

    
        

        

    </div>

 
    


    

    

    </>
  );
};

export default perfilDeslogado;

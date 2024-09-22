import Eleitorais from "@/components/candidatos/Eleitorais";
import Header from "@/components/candidatos/Header";
import Pessais from "@/components/candidatos/Pessoais";


export default function Candidato() {
    return (
        <div
            className={`
                w-full min-h-screen p-6 px-4 md:px-6 
                flex flex-col gap-3
            `}
        >
            <Header /> 
            <Pessais />
            <Eleitorais />
        </div>
    );
}
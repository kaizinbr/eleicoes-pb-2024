/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import titleCased from "@/utils/handlers/titleCased";



export default function Header({data}: {data: any}) {
    return (
        <>
            {!data ? (null) : (<div
                className={`
                    flex flex-col items-center justify-center
                    p-4 md:h-screen md:sticky md:top-0
            
                `}
            >
                <h2 className="text-xl text-center text-gray-800 mb-6 font-semibold">
                    {data.CD_GENERO == "4" ? "Candidata" : "Candidato"} a{" "}
                    {titleCased(data.DS_CARGO)}
                </h2>
                <Image
                    src={`https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img/2045202024/${data.SQ_CANDIDATO}/${data.SG_UE}`}
                    alt="Logo"
                    width={200}
                    height={300}
                    className="rounded-lg mb-4"
                />
                <h1 className="text-3xl text-center font-bold">
                    {titleCased(data.NM_URNA_CANDIDATO)}
                </h1>
                <h1 className="text-3xl mb-2 text-center font-bold">
                    {data.NR_CANDIDATO}
                </h1>
                <h2 className="text-base text-center text-gray-800">
                    {data.SG_PARTIDO}
                </h2>
                <h2 className="text-base text-center text-gray-800">
                    {titleCased(data.NM_COLIGACAO)}
                </h2>
                <h2 className="text-base text-center text-gray-800">
                    {data.DS_COMPOSICAO_COLIGACAO}
                </h2>
            </div>)}
        </>
    );
}

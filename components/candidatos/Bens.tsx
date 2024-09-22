/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
// import { calcularIdade } from "@/utils/handlers/readIdades";

export default function Bens({ bens }: { bens: any }) {
    let total = 0;
    if (bens) {
        total = bens.reduce((acc: number, bem: any) => {
            return acc + parseFloat(bem.VR_BEM_CANDIDATO);
        }, 0);
        console.log("Total de bens:", total);
    }
    return (
        <div className="flex flex-col w-full gap-3 mt-6">
            {!bens ? null : (
                <>
                    <h2 className="text-xl font-bold">Bens declarados</h2>
                    <div className="flex flex-row">
                        <p className="font-medium text-gray-800 mr-1">
                            Quantidade:
                        </p>
                        <p className="font-bold">
                            {bens.length}
                        </p>
                    </div><div className="flex flex-row">
                        <p className="font-medium text-gray-800 mr-1">
                            Valor total:
                        </p>
                        <p className="font-bold">
                            {total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                        </p>
                    </div>
                    {bens.map((bem: any, index: number) => (
                        <div
                            key={bem.SQ_CANDIDATO + index}
                            className={`
                            flex flex-col 
                            p-4 gap-2
                            bg-gray-200 border-2 border-border
                            rounded-2xl
                        `}
                        >
                            <div className="flex flex-col gap-2">
                                <h1 className="text-xl font-bold">
                                    {bem.DS_TIPO_BEM_CANDIDATO}
                                </h1>
                                <div className="flex flex-col gap-2">
                                    <p>{bem.DS_BEM_CANDIDATO}</p>
                                    <p>Valor: R$ {bem.VR_BEM_CANDIDATO}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

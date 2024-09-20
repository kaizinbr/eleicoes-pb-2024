/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectCargo from "@/components/SelectCargo";
import SelectCidade from "@/components/SelectCidade";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Main() {
    const [data, setData] = useState<string[]>([]);
    const [cidade, setCidade] = useState<string>("");
    const [cargo, setCargo] = useState<string>("11");
    const [loading, setLoading] = useState<boolean>(true);

    const getAllCandidatos = async () => {
        setData([]);

        if (!cidade || !cargo) {
            return;
        }
        const codCidade = cidade.split(" - ")[0];
        const codCargo = cargo.split(" - ")[0];
        
        try {
            const response = await axios.get(
                `/api/getAllCandidatos?cidade=${codCidade}&cargo=${codCargo}`
            );
            console.log(response.data.data);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // {
    //     "0": {
    //         "id": 150001992742,
    //         "nome": "ALEX GABRIEL",
    //         "numero": "12112",
    //         "numeroPartido": "12",
    //         "siglaPartido": "PDT"
    //     }
    // }

    return (
        <div className="m-auto max-w-xl">
            <SelectCidade cidade={cidade} setCidade={setCidade} />
            <SelectCargo cargo={cargo} setCargo={setCargo} />
            <button
                className={`
                    bg-tuscany-500 w-full rounded-lg p-2 text-white
                `}
                onClick={() => getAllCandidatos()}
            >
                Pesquisar
            </button>

            <div className="py-8">
                {loading ? null : (
                    <ul className="flex flex-col gap-3">
                        {data.map((candidato: any) => (
                            <li key={candidato.id}>
                                <div
                                    className={`
                                        flex flex-row gap-3
                                        bg-woodsmoke-900 rounded-xl overflow-hidden
                                        border-2 border-woodsmoke-800
                                    `}
                                >
                                    <Image
                                        src={candidato.img}
                                        alt="Logo"
                                        width={80}
                                        height={112}
                                    />

                                    <div className="flex flex-col flex-grow py-3 justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">
                                                {candidato.nome} {candidato.numero}
                                            </span>
                                            <span className="text-woodsmoke-300 text-sm">
                                                {candidato.cargo}
                                            </span>
                                        </div>

                                        <div className="">
                                            <span className="text-woodsmoke-300 text-sm">
                                                {candidato.siglaPartido}{" "}
                                                {candidato.numeroPartido}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-14 right-0 flex items-center justify-center">
                                        <ChevronRight size={32} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

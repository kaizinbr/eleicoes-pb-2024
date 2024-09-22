/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectCargo from "@/components/SelectCargo";
import SelectCidade from "@/components/SelectCidade";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Main() {
    const [data, setData] = useState<string[]>([]);
    const [cidade, setCidade] = useState<string>("19020 - SOBRADO");
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

    return (
        <div className="m-auto max-w-xl">
            <SelectCidade cidade={cidade} setCidade={setCidade} />
            <SelectCargo cargo={cargo} setCargo={setCargo} />
            <button
                className={`
                    bg-primary-500 w-full rounded-xl py-3 text-white
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
                                <Link
                                    href={`/candidato/${candidato.id}`}
                                    className={`
                                        flex flex-row gap-3
                                        bg-gray-200 hover:bg-primary-50 rounded-xl overflow-hidden
                                        border-2 border-border hover:border-primary-400
                                        transition-all duration-300
                                        group
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
                                            <span className=" font-bold">
                                                {candidato.nome} {candidato.numero}
                                            </span>
                                            <span className="text-black/60 text-sm">
                                                {candidato.cargo}
                                            </span>
                                        </div>

                                        <div className="">
                                            <span className="text-black/60 text-sm">
                                                {candidato.siglaPartido}{" "}
                                                {candidato.numeroPartido}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-14 right-0 flex items-center justify-center">
                                        <ChevronRight size={32} className="group-hover:text-primary-500 transition-all duration-300" />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

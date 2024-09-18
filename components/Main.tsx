/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SelectCargo from "@/components/SelectCargo";
import SelectCidade from "@/components/SelectCidade";

export default function Main() {
    const [data, setData] = useState<string[]>([]);
    const [cidade, setCidade] = useState<string>("");
    const [cargo, setCargo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const getAllCandidatos = async () => {
        if (!cidade || !cargo) {
            return;
        }
        const codCidade = cidade.split(" - ")[0];
        const codCargo = cargo.split(" - ")[0];
        // console.log(codCidade, codCargo);
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
        <div className="">
            <SelectCidade cidade={cidade} setCidade={setCidade} />
            <SelectCargo cargo={cargo} setCargo={setCargo} />
            <button onClick={() => getAllCandidatos()}>Pesquisar</button>

            <div>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul>
                        {data.map((candidato: any) => (
                            <li key={candidato.ID}>
                                {candidato.NOME} - {candidato.NM_URNA}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

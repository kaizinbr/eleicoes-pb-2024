"use client";
import Eleitorais from "@/components/candidatos/Eleitorais";
import Header from "@/components/candidatos/Header";
import Pessoais from "@/components/candidatos/Pessoais";
import Bens from "@/components/candidatos/Bens";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Candidato({ params }: { params: { id: string } }) {
    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [candidatoData, setCandidatoData] = useState(null);
    const [outrasData, setOutrasData] = useState(null);
    const [bens, setBens] = useState(null);

    useEffect(() => {
        async function fetchCandidatoData() {
            try {
                const response = await axios.get(`/api/candidato/${params.id}`);
                setCandidatoData(response.data.data[0]);
                setOutrasData(response.data.data[1]);
                setBens(response.data.data[2]);
                console.log("Candidato data:", response.data);
            } catch (error) {
                console.error("Error fetching candidato data:", error);
            }
        }

        fetchCandidatoData();
    }, [params.id]);
    return (
        <div
            className={`
                w-full min-h-screen p-6 px-4 md:px-6 
                flex flex-col gap-3
            `}
        >
            <Header data={candidatoData} /> 
            <Pessoais data={candidatoData} outros={outrasData} />
            <Eleitorais data={candidatoData} outros={outrasData} />
            <Bens bens={bens} />
        </div>
    );
}
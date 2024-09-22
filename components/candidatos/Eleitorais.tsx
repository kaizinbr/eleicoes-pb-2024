/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
import titleCased from "@/utils/handlers/titleCased";
// import { calcularIdade } from "@/utils/handlers/readIdades";

// const data = {
//     DT_GERACAO: "12/09/2024",
//     HH_GERACAO: "19:30:50",
//     ANO_ELEICAO: "2024",
//     CD_TIPO_ELEICAO: "2",
//     NM_TIPO_ELEICAO: "ELEIÇÃO ORDINÁRIA",
//     NR_TURNO: "1",
//     CD_ELEICAO: "619",
//     DS_ELEICAO: "Eleições Municipais 2024",
//     DT_ELEICAO: "06/10/2024",
//     TP_ABRANGENCIA_ELEICAO: "MUNICIPAL",
//     SG_UF: "PB",
//     SG_UE: "19020",
//     NM_UE: "SOBRADO",
//     CD_CARGO: "11",
//     DS_CARGO: "PREFEITO",
//     SQ_CANDIDATO: "150002115039",
//     NR_CANDIDATO: "45",
//     NM_CANDIDATO: "ANA RAQUEL DE OLIVEIRA MELO",
//     NM_URNA_CANDIDATO: "RAQUEL MELO",
//     NM_SOCIAL_CANDIDATO: "#NULO#",
//     NR_CPF_CANDIDATO: "-4",
//     DS_EMAIL: "NÃO DIVULGÁVEL",
//     CD_SITUACAO_CANDIDATURA: "-3",
//     DS_SITUACAO_CANDIDATURA: "#NE",
//     TP_AGREMIACAO: "COLIGAÇÃO",
//     NR_PARTIDO: "45",
//     SG_PARTIDO: "PSDB",
//     NM_PARTIDO: "PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA",
//     NR_FEDERACAO: "100",
//     NM_FEDERACAO: "Federação PSDB CIDADANIA",
//     SG_FEDERACAO: "PSDB/CIDADANIA",
//     DS_COMPOSICAO_FEDERACAO: "PSDB/CIDADANIA",
//     SQ_COLIGACAO: "150001726717",
//     NM_COLIGACAO: "A ESPERANÇA QUE NOS UNE",
//     DS_COMPOSICAO_COLIGACAO:
//         "Federação PSDB CIDADANIA(PSDB/CIDADANIA) / PP / PODE",
//     SG_UF_NASCIMENTO: "PB",
//     DT_NASCIMENTO: "10/04/1973",
//     NR_TITULO_ELEITORAL_CANDIDATO: "017621611252",
//     CD_GENERO: "4",
//     DS_GENERO: "FEMININO",
//     CD_GRAU_INSTRUCAO: "8",
//     DS_GRAU_INSTRUCAO: "SUPERIOR COMPLETO",
//     CD_ESTADO_CIVIL: "3",
//     DS_ESTADO_CIVIL: "CASADO(A)",
//     CD_COR_RACA: "01",
//     DS_COR_RACA: "BRANCA",
//     CD_OCUPACAO: "298",
//     DS_OCUPACAO: "SERVIDOR PÚBLICO MUNICIPAL",
//     CD_SIT_TOT_TURNO: "-1",
//     DS_SIT_TOT_TURNO: "#NULO#",
// };

export default function Eleitorais({ data, outros }: { data: any, outros: any }) {
    return (
        <div>
            {!data ? (null) : (
                <div
                className={`
                    flex flex-col 
                    p-4 gap-2
                    bg-gray-200 border-2 border-border
                    rounded-2xl
                `}
            >
                <h2 className="text-xl mb-3 font-bold">Informações eleitorais</h2>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Nome:</p>
                    <p className="font-bold">
                        {titleCased(data.NM_URNA_CANDIDATO)}
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Número:</p>
                    <p className="font-bold">{data.NR_CANDIDATO}</p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Partido:</p>
                    <p className="font-bold">
                        {data.NM_PARTIDO} ({data.SG_PARTIDO})
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Número do partido:</p>
                    <p className="font-bold">
                        {data.NR_PARTIDO}
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Reeleição:</p>
                    <p className="font-bold">
                        {outros.ST_REELEICAO === "S" ? "Sim" : "Não"}
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Agremiação:</p>
                    <p className="font-bold">
                        {(data.TP_AGREMIACAO)}
                    </p>            
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Federação:</p>
                    <p className="font-bold">
                        {(data.NM_FEDERACAO)} ({(data.DS_COMPOSICAO_FEDERACAO)})
                    </p>            
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Coligação:</p>
                    <p className="font-bold">
                        {(data.NM_COLIGACAO)} ({(data.DS_COMPOSICAO_COLIGACAO)})
                    </p>            
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Partido:</p>
                    <p className="font-bold">{data.SG_PARTIDO}</p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Partido:</p>
                    <p className="font-bold">{data.SG_PARTIDO}</p>
                </div>
                <div className="flex flex-row">
                    <p className="font-medium text-gray-800 mr-1">Limite de gastos:</p>
                    <p className="font-bold">{Number(outros.VR_DESPESA_MAX_CAMPANHA).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                </div>
            </div>
            )}
        </div>
    );
}

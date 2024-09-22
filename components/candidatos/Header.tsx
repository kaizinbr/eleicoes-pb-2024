import Image from "next/image";
import titleCased from "@/utils/handlers/titleCased";

const data = {
    DT_GERACAO: "12/09/2024",
    HH_GERACAO: "19:30:50",
    ANO_ELEICAO: "2024",
    CD_TIPO_ELEICAO: "2",
    NM_TIPO_ELEICAO: "ELEIÇÃO ORDINÁRIA",
    NR_TURNO: "1",
    CD_ELEICAO: "619",
    DS_ELEICAO: "Eleições Municipais 2024",
    DT_ELEICAO: "06/10/2024",
    TP_ABRANGENCIA_ELEICAO: "MUNICIPAL",
    SG_UF: "PB",
    SG_UE: "19020",
    NM_UE: "SOBRADO",
    CD_CARGO: "11",
    DS_CARGO: "PREFEITO",
    SQ_CANDIDATO: "150002115039",
    NR_CANDIDATO: "45",
    NM_CANDIDATO: "ANA RAQUEL DE OLIVEIRA MELO",
    NM_URNA_CANDIDATO: "RAQUEL MELO",
    NM_SOCIAL_CANDIDATO: "#NULO#",
    NR_CPF_CANDIDATO: "-4",
    DS_EMAIL: "NÃO DIVULGÁVEL",
    CD_SITUACAO_CANDIDATURA: "-3",
    DS_SITUACAO_CANDIDATURA: "#NE",
    TP_AGREMIACAO: "COLIGAÇÃO",
    NR_PARTIDO: "45",
    SG_PARTIDO: "PSDB",
    NM_PARTIDO: "PARTIDO DA SOCIAL DEMOCRACIA BRASILEIRA",
    NR_FEDERACAO: "100",
    NM_FEDERACAO: "Federação PSDB CIDADANIA",
    SG_FEDERACAO: "PSDB/CIDADANIA",
    DS_COMPOSICAO_FEDERACAO: "PSDB/CIDADANIA",
    SQ_COLIGACAO: "150001726717",
    NM_COLIGACAO: "A ESPERANÇA QUE NOS UNE",
    DS_COMPOSICAO_COLIGACAO:
        "Federação PSDB CIDADANIA(PSDB/CIDADANIA) / PP / PODE",
    SG_UF_NASCIMENTO: "PB",
    DT_NASCIMENTO: "10/04/1973",
    NR_TITULO_ELEITORAL_CANDIDATO: "017621611252",
    CD_GENERO: "4",
    DS_GENERO: "FEMININO",
    CD_GRAU_INSTRUCAO: "8",
    DS_GRAU_INSTRUCAO: "SUPERIOR COMPLETO",
    CD_ESTADO_CIVIL: "3",
    DS_ESTADO_CIVIL: "CASADO(A)",
    CD_COR_RACA: "01",
    DS_COR_RACA: "BRANCA",
    CD_OCUPACAO: "298",
    DS_OCUPACAO: "SERVIDOR PÚBLICO MUNICIPAL",
    CD_SIT_TOT_TURNO: "-1",
    DS_SIT_TOT_TURNO: "#NULO#",
};

export default function Header() {
    return (
        <div
            className={`
                flex flex-col items-center justify-center
                p-4
                
            `}
        >
            <h2 className="text-xl text-center text-woodsmoke-300 mb-6 font-semibold">
                {data.CD_GENERO == "4" ? "Candidata" : "Candidato"} a{" "}
                {titleCased(data.DS_CARGO)}
            </h2>
            <Image
                src="https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img/2045202024/150002115039/19020"
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
            <h2 className="text-base text-center text-woodsmoke-300">
                {data.SG_PARTIDO}
            </h2>
            <h2 className="text-base text-center text-woodsmoke-300">
                {titleCased(data.NM_COLIGACAO)}
            </h2>
            <h2 className="text-base text-center text-woodsmoke-300">
                {data.DS_COMPOSICAO_COLIGACAO}
            </h2>
        </div>
    );
}

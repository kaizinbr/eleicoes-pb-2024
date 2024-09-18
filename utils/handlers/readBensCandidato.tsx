/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// retorna um array com os bens do candidato a partir do codigo
export default function readBensCandidato(cod: string | number) {
    const csvData = csvToJson("data/bem_candidato_2024_PB.csv");

    const candidateRecords = csvData.filter(
        (record) => record.SQ_CANDIDATO === cod
    );
    

    if (candidateRecords) {
        return candidateRecords;
    } else {
        console.log(`Candidato com número ${cod} não encontrado.`);
        return null;
    }
}
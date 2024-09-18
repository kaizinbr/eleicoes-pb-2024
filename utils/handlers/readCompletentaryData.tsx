/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// retorna a linha completa do candidato a partir do codigo
export default function readCompletentaryData(cod: string | number) {
    const csvData = csvToJson("data/consulta_cand_complementar_2024_PB.csv");

    const candidateRecord = csvData.find(
        (record) => record.SQ_CANDIDATO === cod
    );

    if (candidateRecord) {
        return candidateRecord;
    } else {
        console.log(`Candidato com número ${cod} não encontrado.`);
        return null;
    }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// retorna a linha completa do candidato a partir do codigo
export default function readCandidatoRow(cod: string | number) {
    const csvData = csvToJson();

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
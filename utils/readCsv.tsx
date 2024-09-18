/* eslint-disable @typescript-eslint/no-explicit-any */

import csvToJson from "./csvToJson";
import readCandidatoRow from "./handlers/readCandidatoRow";
import readCandidatos from "./handlers/readCandidatos";
import readGenero from "./handlers/readGenero";
import readCidadesComCod from "./handlers/readCidadesComCod";
import readGrauDeInstrucao from "./handlers/readGrauDeInstrucao";
import readEstadoCivil from "./handlers/readEstadoCivil";
import readIdades from "./handlers/readIdades";
import readCompletentaryData from "./handlers/readCompletentaryData";
import readBensCandidato from "./handlers/readBensCandidato";

// mesma coisa que a função anterior, mas para cargos
// meio inutil pq só tem 3 cargos não vale o processamento
export function readCargos() {
    const csvData = csvToJson();

    const column1 = "SG_UE"; // cod da cidade
    const column2 = "NM_UE"; // nome da cidade

    const uniqueResults = new Set(); //usado pra garantir que não haverá repetições
    const result: [string, string][] = [];

    csvData.forEach((record) => {
        const combinedValue = `${record[column1]},${record[column2]}`;
        if (!uniqueResults.has(combinedValue)) {
            uniqueResults.add(combinedValue);
            result.push([record[column1], record[column2]]);
        }
    });

    return result;
}

export {
    csvToJson,
    readCandidatos,
    readCandidatoRow,
    readGenero,
    readCidadesComCod,
    readGrauDeInstrucao,
    readEstadoCivil,
    readIdades,
    readCompletentaryData,
    readBensCandidato
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";


// extrai as cidades com seus respectivos códigos
// retorna um array de tuplas [cod, cidade]
// ex: [["1", "João Pessoa"], ["2", "Campina Grande"], ...] o cod é uma string!!!
export default function readCidadesComCod() {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

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
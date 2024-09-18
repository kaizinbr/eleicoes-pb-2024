/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

//retorna apenas nome e número do candidato a partir do codigo da cidade e do cargo
export default function readCandidatos(codCidade: string, codCargo: string) {
    const csvData = csvToJson();

    const column1 = "NM_CANDIDATO"; // Nome do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "SG_UE"; // Código do cargo
    const column5 = "CD_CARGO"; // Código do cargo

    const uniqueResults = new Set();
    // o SQ_CANDIDATO é unico então nao entra no set e vai ser convertido em number pra virar um id
    const result: { ID: number; NOME: string; NM_URNA: string }[] = [];

    csvData.forEach((record) => {
        const combinedValue = `${record[column1]},${record[column2]},${record[column3]}`;
        if (
            record[column4] === codCidade &&
            record[column5] === codCargo &&
            !uniqueResults.has(combinedValue)
        ) {
            uniqueResults.add(combinedValue);
            result.push({
                ID: Number(record[column3]),
                NOME: record[column1],
                NM_URNA: record[column2],
            });
        }
    });

    return result;
}
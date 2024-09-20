/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";
import titleCased from "./titleCased";

//retorna apenas nome e número do candidato a partir do codigo da cidade e do cargo
export default function readCandidatos(codCidade: string, codCargo: string) {
    const csvData = csvToJson();

    const column1 = "NM_URNA_CANDIDATO"; // Nome na urna do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "SG_UE"; // Código do cargo
    const column5 = "CD_CARGO"; // Código do cargo

    const column6 = "NR_PARTIDO" // numero do partido
    const column7 = "SG_PARTIDO" // sigla do partido

    const uniqueResults = new Set();
    // o SQ_CANDIDATO é unico então nao entra no set e vai ser convertido em number pra virar um id
    const result: { id: number; cargo: string; nome: string; numero: string; numeroPartido: string; siglaPartido: string; img: string }[] = [];

    csvData.forEach((record) => {
        const combinedValue = `${record[column1]},${record[column2]},${record[column3]}`;
        if (
            record[column4] === codCidade &&
            record[column5] === codCargo &&
            !uniqueResults.has(combinedValue)
        ) {
            uniqueResults.add(combinedValue);
            result.push({
                id: Number(record[column3]),
                cargo: titleCased(record["DS_CARGO"]), // Formata o cargo em Title Case
                nome: titleCased(record[column1]), // Formata o nome em Title Case
                numero: record[column2],
                numeroPartido: record[column6],
                siglaPartido: record[column7],
                img: `https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img/2045202024/${record[column3]}/${record[column4]}`, //url do site do proprio tse, pode n funcionar pra todos
            });
        }
    });

    return result;
}
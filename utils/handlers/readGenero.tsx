/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// separa por genero
export default function readGenero(cargo?: string) {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

    //     2: Masculino; e
    // . 4: Feminino.
    const masc: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // masculino
    const fem: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // feminino

    const column1 = "NM_CANDIDATO"; // Nome do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "CD_GENERO"; // codigo do grau de instrucao
    const column5 = "CD_CARGO"; // codigo do cargo

    const uniqueResults = new Set(); // eu acho q pode tirar o unique aqui mas to com preguiça de testar

    let total = 0;

    csvData.forEach((record) => {
        if (record[column5] === String(cargo)) {
            total++;

            const combinedValue = `${record[column1]},${record[column2]},${record[column3]},${record[column4]}`;

            if (record[column4] === "2") {
                uniqueResults.add(combinedValue);
                masc.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "4") {
                uniqueResults.add(combinedValue);
                fem.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            }
        }
    });

    // calcular todas as porcentagens
    const porcentagemMasc = (masc.length / total) * 100;
    const porcentagemFem = (fem.length / total) * 100;

    const results = {
        total,
        codCargo: cargo,
        masc: {
            porcentagem: porcentagemMasc.toFixed(2),
            quantidade: masc.length,
            candidatos: masc,
        },
        fem: {
            porcentagem: porcentagemFem.toFixed(2),
            quantidade: fem.length,
            candidatos: fem,
        },
    };

    return results;
}
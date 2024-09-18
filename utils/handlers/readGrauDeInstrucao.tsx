/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// separa por grau de instrução
export default function readGrauDeInstrucao(cargo?: string) {
    const csvData = csvToJson();

    //     Código do grau de instrução da candidata ou
    // candidato. Pode assumir os valores:
    // . 1: Analfabeto;
    // . 2: Lê e escreve;
    // . 3: Ensino fundamental incompleto;
    // . 4: Ensino fundamental completo;
    // . 5: Ensino médio incompleto;
    // . 6: Ensino médio completo;
    // . 7: Superior incompleto; e
    // . 8: Superior completo.

    const analf: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // analfabeto
    const leEscreve: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // le e escreve
    const fundInc: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // fundamental incompleto
    const fundComp: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // fundamental completo
    const medioInc: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // médio incompleto
    const medioComp: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // médio completo
    const supInc: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // superior incompleto
    const supComp: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // superior completo

    const column1 = "NM_CANDIDATO"; // Nome do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "CD_GRAU_INSTRUCAO"; // codigo do grau de instrucao
    const column5 = "CD_CARGO"; // codigo do cargo

    const uniqueResults = new Set(); // eu acho q pode tirar o unique aqui mas to com preguiça de testar

    let total = 0; //total por cargo

    csvData.forEach((record) => {
        if (record[column5] === String(cargo)) {
            total++; //acrescenta o total

            const combinedValue = `${record[column1]},${record[column2]},${record[column3]},${record[column4]}`;

            if (record[column4] === "1") {
                uniqueResults.add(combinedValue);
                analf.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "2") {
                uniqueResults.add(combinedValue);
                leEscreve.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "3") {
                uniqueResults.add(combinedValue);
                fundInc.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "4") {
                uniqueResults.add(combinedValue);
                fundComp.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "5") {
                uniqueResults.add(combinedValue);
                medioInc.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "6") {
                uniqueResults.add(combinedValue);
                medioComp.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "7") {
                uniqueResults.add(combinedValue);
                supInc.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "8") {
                uniqueResults.add(combinedValue);
                supComp.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            }
        }
    });

    // calcular todas as porcentagens
    const porcentagemAnalf = (analf.length / total) * 100;
    const porcentagemLeEscreve = (leEscreve.length / total) * 100;
    const porcentagemFundInc = (fundInc.length / total) * 100;
    const porcentagemFundComp = (fundComp.length / total) * 100;
    const porcentagemMedioInc = (medioInc.length / total) * 100;
    const porcentagemMedioComp = (medioComp.length / total) * 100;
    const porcentagemSupInc = (supInc.length / total) * 100;
    const porcentagemSupComp = (supComp.length / total) * 100;

    const results = {
        total,
        analfabeto: {
            porcentagem: porcentagemAnalf.toFixed(2),
            quantidade: analf.length,
            candidatos: analf,
        },
        leEscreve: {
            porcentagem: porcentagemLeEscreve.toFixed(2),
            quantidade: leEscreve.length,
            candidatos: leEscreve,
        },
        fundInc: {
            porcentagem: porcentagemFundInc.toFixed(2),
            quantidade: fundInc.length,
            candidatos: fundInc,
        },
        fundComp: {
            porcentagem: porcentagemFundComp.toFixed(2),
            quantidade: fundComp.length,
            candidatos: fundComp,
        },
        medioInc: {
            porcentagem: porcentagemMedioInc.toFixed(2),
            quantidade: medioInc.length,
            candidatos: medioInc,
        },
        medioComp: {
            porcentagem: porcentagemMedioComp.toFixed(2),
            quantidade: medioComp.length,
            candidatos: medioComp,
        },
        supInc: {
            porcentagem: porcentagemSupInc.toFixed(2),
            quantidade: supInc.length,
            candidatos: supInc,
        },
        supComp: {
            porcentagem: porcentagemSupComp.toFixed(2),
            quantidade: supComp.length,
            candidatos: supComp,
        },
    };

    return results;
}
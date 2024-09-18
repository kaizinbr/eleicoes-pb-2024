/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

// separa por estado civil
export default function readEstadoCivil(cargo?: string) {
    const csvData = csvToJson();

    //     1: Solteiro(a);
    // . 3: Casado(a);
    // . 5: Viúvo(a);
    // . 7: Separado(a) judicialmente; e
    // . 9: Divorciado(a)

    const solteiro: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // solteiro
    const casado: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // casado
    const viuvo: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // viuvo
    const separado: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // separado
    const divorciado: {
        ID: number;
        NOME: any;
        NM_URNA: any;
    }[] = []; // divorciado


    const column1 = "NM_CANDIDATO"; // Nome do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "CD_ESTADO_CIVIL"; // codigo do estado civil
    const column5 = "CD_CARGO"; // codigo do cargo

    const uniqueResults = new Set(); // eu acho q pode tirar o unique aqui mas to com preguiça de testar

    let total = 0;

    csvData.forEach((record) => {
        if (record[column5] === String(cargo)) {
            total++;

            const combinedValue = `${record[column1]},${record[column2]},${record[column3]},${record[column4]}`;

            if (record[column4] === "1") {
                uniqueResults.add(combinedValue);
                solteiro.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "3") {
                uniqueResults.add(combinedValue);
                casado.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "5") {
                uniqueResults.add(combinedValue);
                viuvo.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "7") {
                uniqueResults.add(combinedValue);
                separado.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            } else if (record[column4] === "9") {
                uniqueResults.add(combinedValue);
                divorciado.push({
                    ID: Number(record[column3]),
                    NOME: record[column1],
                    NM_URNA: record[column2],
                });
            }
        }
    });

    // calcular todas as porcentagens
    const porcentagemSolteiro = (solteiro.length / total) * 100;
    const porcentagemCasado = (casado.length / total) * 100;
    const porcentagemViuvo = (viuvo.length / total) * 100;
    const porcentagemSeparado = (separado.length / total) * 100;
    const porcentagemDivorciado = (divorciado.length / total) * 100;

    const results = {
        total,
        codCargo: cargo,
        solteiro: {
            porcentagem: porcentagemSolteiro.toFixed(2),
            quantidade: solteiro.length,
            candidatos: solteiro,
        },
        casado: {
            porcentagem: porcentagemCasado.toFixed(2),
            quantidade: casado.length,
            candidatos: casado,
        },
        viuvo: {
            porcentagem: porcentagemViuvo.toFixed(2),
            quantidade: viuvo.length,
            candidatos: viuvo,
        },
        separado: {
            porcentagem: porcentagemSeparado.toFixed(2),
            quantidade: separado.length,
            candidatos: separado,
        },
        divorciado: {
            porcentagem: porcentagemDivorciado.toFixed(2),
            quantidade: divorciado.length,
            candidatos: divorciado,
        },

    };

    return results;
}
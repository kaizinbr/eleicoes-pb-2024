/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { parse } from "csv-parse/sync";

/**
 * Converts a CSV file to an array of JSON objects where each row in the CSV becomes an object.
 * @param {string} filePath The path to the CSV file.
 * @returns {any[]} An array of objects, each representing a row in the CSV.
 */
export default function csvToJson(filePath: string): any[] {
    const csvFile = fs.readFileSync(filePath);
    const records = parse(csvFile, {
        delimiter: ";", // Especifique o delimitador correto
        columns: true, // Se o CSV tem cabeçalhos
        trim: true,
        skip_empty_lines: true,
        encoding: "latin1",
    });
    return records;
}

// retorna a linha completa do candidato a partir do codigo
export function readCandidatoRow(cod: string | number) {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

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

//retorna apenas nome e número do candidato a partir do codigo da cidade e do cargo
export function readCandidatos(codCidade: string, codCargo: string) {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

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

function calcularIdade(dataNascimento: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function converterData(data: string): string {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}

// Exemplo de uso
// const dataNascimento = '2000-05-15'; // Formato YYYY-MM-DD
// const idade = calcularIdade(dataNascimento);
// console.log(`Idade: ${idade}`);

// faz a separaçao dos candidatos por idade
// preferi fazer tudo de uma vez pra poupar processamento mas não tem tanta diferença se vc fizer funções assincronas separadas
export function readIdades() {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

    //     Quantidade de candidatos, nas faixas:
    // ● Até 21 anos;
    // ● Entre 22 anos e 40 anos;
    // ● Entre 41 anos e 60 anos;
    // ● Acima de 60 anos.

    const classe1: {
        ID: number;
        NOME: any;
        NM_URNA: any;
        IDADE: number;
        DT_NASCIMENTO: string;
    }[] = []; // até 21 anos
    const classe2: {
        ID: number;
        NOME: any;
        NM_URNA: any;
        IDADE: number;
        DT_NASCIMENTO: string;
    }[] = []; // 22 a 40 anos
    const classe3: {
        ID: number;
        NOME: any;
        NM_URNA: any;
        IDADE: number;
        DT_NASCIMENTO: string;
    }[] = []; // 41 a 60 anos
    const classe4: {
        ID: number;
        NOME: any;
        NM_URNA: any;
        IDADE: number;
        DT_NASCIMENTO: string;
    }[] = []; // acima de 60 anos

    const column1 = "NM_CANDIDATO"; // Nome do candidato
    const column2 = "NR_CANDIDATO"; // Número do candidato
    const column3 = "SQ_CANDIDATO"; // Código da cidade
    const column4 = "DT_NASCIMENTO"; // Idade do candidato

    const uniqueResults = new Set(); // eu acho q pode tirar o unique aqui mas to com preguiça de testar

    csvData.forEach((record) => {
        const combinedValue = `${record[column1]},${record[column2]},${record[column3]},${record[column4]}`;

        const dataConvertida = converterData(record[column4]); // Supondo que column6 seja a data de nascimento no formato "DD/MM/YYYY"
        const idade = calcularIdade(dataConvertida);
        // console.log("data", record[column6], "idade", idade);

        if (idade < 21 && !uniqueResults.has(combinedValue)) {
            uniqueResults.add(combinedValue);
            classe1.push({
                ID: Number(record[column3]),
                NOME: record[column1],
                NM_URNA: record[column2],
                IDADE: idade,
                DT_NASCIMENTO: record[column4],
            });
            // classe1.push(record[column6]);
        } else if (
            idade >= 21 &&
            idade <= 40 &&
            !uniqueResults.has(combinedValue)
        ) {
            uniqueResults.add(combinedValue);
            classe2.push({
                ID: Number(record[column3]),
                NOME: record[column1],
                NM_URNA: record[column2],
                IDADE: idade,
                DT_NASCIMENTO: record[column4],
            });
            // classe2.push(record[column6]);
        } else if (
            idade >= 41 &&
            idade <= 60 &&
            !uniqueResults.has(combinedValue)
        ) {
            uniqueResults.add(combinedValue);
            classe3.push({
                ID: Number(record[column3]),
                NOME: record[column1],
                NM_URNA: record[column2],
                IDADE: idade,
                DT_NASCIMENTO: record[column4],
            });
            // classe3.push(record[column6]);
        } else if (idade > 60 && !uniqueResults.has(combinedValue)) {
            uniqueResults.add(combinedValue);
            classe4.push({
                ID: Number(record[column3]),
                NOME: record[column1],
                NM_URNA: record[column2],
                IDADE: idade,
                DT_NASCIMENTO: record[column4],
            });
            // classe4.push(record[column6]);
        }
    });

    const result = {
        classe1: {
            quantidade: classe1.length,
            classe: "Até 21 anos",
            candidatos: classe1,
        },
        classe2: {
            quantidade: classe2.length,
            classe: "Entre 22 e 40 anos",
            candidatos: classe2,
        },
        classe3: {
            quantidade: classe3.length,
            classe: "Entre 41 e 60 anos",
            candidatos: classe3,
        },
        classe4: {
            quantidade: classe4.length,
            classe: "Acima de 60 anos",
            candidatos: classe4,
        },
    };

    return result;
}

export function readGrauDeInstrucao() {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");

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

    const uniqueResults = new Set(); // eu acho q pode tirar o unique aqui mas to com preguiça de testar

    csvData.forEach((record) => {
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

    
    });

        // calcular todas as porcentagens
        const totalRegistros = csvData.length;
        const porcentagemAnalf = (analf.length / totalRegistros) * 100;
        const porcentagemLeEscreve = (leEscreve.length / totalRegistros) * 100;
        const porcentagemFundInc = (fundInc.length / totalRegistros) * 100;
        const porcentagemFundComp = (fundComp.length / totalRegistros) * 100;
        const porcentagemMedioInc = (medioInc.length / totalRegistros) * 100;
        const porcentagemMedioComp = (medioComp.length / totalRegistros) * 100;
        const porcentagemSupInc = (supInc.length / totalRegistros) * 100;
        const porcentagemSupComp = (supComp.length / totalRegistros) * 100;

        console.log(`Porcentagem Analfabeto: ${porcentagemAnalf.toFixed(2)}%`);
        console.log(`Porcentagem Lê e Escreve: ${porcentagemLeEscreve.toFixed(2)}%`);
        console.log(`Porcentagem Fundamental Incompleto: ${porcentagemFundInc.toFixed(2)}%`);
        console.log(`Porcentagem Fundamental Completo: ${porcentagemFundComp.toFixed(2)}%`);
        console.log(`Porcentagem Médio Incompleto: ${porcentagemMedioInc.toFixed(2)}%`);
        console.log(`Porcentagem Médio Completo: ${porcentagemMedioComp.toFixed(2)}%`);
        console.log(`Porcentagem Superior Incompleto: ${porcentagemSupInc.toFixed(2)}%`);
        console.log(`Porcentagem Superior Completo: ${porcentagemSupComp.toFixed(2)}%`);

        const results = {
            total: csvData.length,
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

// extrai as cidades com seus respectivos códigos
// retorna um array de tuplas [cod, cidade]
// ex: [["1", "João Pessoa"], ["2", "Campina Grande"], ...] o cod é uma string!!!
export function readCidadesComCod() {
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

// mesma coisa que a função anterior, mas para cargos
// meio inutil pq só tem 3 cargos não vale o processamento
export function readCargos() {
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

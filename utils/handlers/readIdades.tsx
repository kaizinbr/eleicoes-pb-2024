/* eslint-disable @typescript-eslint/no-explicit-any */
import csvToJson from "../csvToJson";

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
export default function readIdades() {
    const csvData = csvToJson();

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
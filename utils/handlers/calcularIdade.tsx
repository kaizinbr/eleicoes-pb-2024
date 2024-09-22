export default function calcularIdade(dataNascimento: string): number {
    const dataConvertida = converterData(dataNascimento)
    const hoje = new Date();
    const nascimento = new Date(dataConvertida);
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
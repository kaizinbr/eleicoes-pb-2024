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

// Exemplo de uso
const dataNascimento = '2000-05-15'; // Formato YYYY-MM-DD
const idade = calcularIdade(dataNascimento);
console.log(`Idade: ${idade}`);
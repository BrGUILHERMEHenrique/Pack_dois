
export function formataCpf(num) {
    let cpf = num.replace(/\D/g, '');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formataCnpj(num) {
    let cnpj = num.replace(/\D/g, '');

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formataPis(num) {
    let pis = num.replace(/\D/g, '');

    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, "$1.$2.$3-$4");
}

export function formataNumero(num) {
    let numero = num.replace(/\D/g, '');

    if (numero.lenght === 10) {
        return numero.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    } else {
        return numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
}
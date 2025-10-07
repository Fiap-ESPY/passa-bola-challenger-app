/**
 * Valida um endereço de e-mail usando uma expressão regular simples.
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} `true` se o e-mail for válido, `false` caso contrário.
 */
export const isEmailValid = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida um número de telefone brasileiro (formatos comuns).
 * @param {string} phone - O telefone a ser validado (apenas números).
 * @returns {boolean} `true` se o telefone for válido, `false` caso contrário.
 */
export const isPhoneValid = (phone: string): boolean => {
    if (!phone) return false;
    const phoneRegex = /^(?:[1-9]{2})?(?:[2-9][0-9]{3,4})[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, '')); // Remove caracteres não numéricos
};

/**
 * Valida um CNPJ brasileiro.
 * @param {string} cnpj - O CNPJ a ser validado (apenas números).
 * @returns {boolean} `true` se o CNPJ for válido, `false` caso contrário.
 */
export const isCnpjValid = (cnpj: string): boolean => {
    if (!cnpj) return false;

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false; 

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
};
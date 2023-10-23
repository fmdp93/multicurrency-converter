// Not properly working yet.
export function moneyIsValid(number) {
    if (number.match(/^(\d{1,3}(,\d{3})+|\d*)\.?\d*$/gm)){
        return true;
    }
}

export function moneyIsValid2(number) {
    if (number.match(/^(0*[!0]\d*)?\.[\d]*$/gm)) {
        return {
            status: false,
            code: CODE_PREP,
        };
    }
}
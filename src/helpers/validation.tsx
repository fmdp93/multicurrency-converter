// Not properly working yet.
export function moneyIsValid(number: string) {
    if (number.match(/^(\d{1,3}(,\d{3})+|\d*)\.?\d*$/gm)){
        return true;
    }
}
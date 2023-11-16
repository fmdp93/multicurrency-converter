export function toFloat(number: string) {
    if (number === "" || number === undefined || typeof number === "number") {
        return number;
    }
    number = number.replaceAll(",", "");
    return parseFloat(number);
}
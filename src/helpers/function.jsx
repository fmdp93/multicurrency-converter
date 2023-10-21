export function toFloat(number) {
    if (number === "" || number === undefined || typeof number === "number") {
        return number;
    }
    number = number.replaceAll(",", "");
    return parseFloat(number);
}
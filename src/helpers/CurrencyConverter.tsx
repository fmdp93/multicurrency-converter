import { toFloat } from "./function";

export class CurrencyConverter {
    baseCurrency = "EUR";
    fromCurrency: string;
    amount: number;
    fromRate: number;
    toRate: number;
    toCurrency: string;

    constructor(fromCurrency: string, amount: number, fromRate: number, toRate: number, toCurrency: string) {
        this.fromCurrency = fromCurrency;
        this.amount = toFloat(amount);
        this.fromRate = toFloat(fromRate);
        this.toRate = toFloat(toRate);
        this.toCurrency = toCurrency;
    }

    getConversion() {
        let convertedAmount;
        if ((convertedAmount = this.baseToTarget()) !== undefined)
            return convertedAmount;

        if ((convertedAmount = this.targetToBase()) !== undefined)
            return convertedAmount;

        return this.targetToTarget();
    }

    baseToTarget() {
        if (this.fromCurrency === this.baseCurrency)
            return this.amount * this.toRate;
    }

    targetToBase() {
        if (
            this.fromCurrency !== this.baseCurrency &&
            this.toCurrency === this.baseCurrency
        ) {
            return this.amount / this.fromRate;
        }
    }

    targetToTarget() {
        // target -> EUR -> target
        return (this.amount / this.fromRate) * this.toRate;
    }
}

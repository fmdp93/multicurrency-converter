import { toFloat } from "./function";

export class CurrencyConverter {
    baseCurrency = "USD";
    fromCurrency: string;
    amount: number;
    fromRate: number;
    toRate: number;
    toCurrency: string | undefined;

    constructor(
        fromCurrency: string, amount: string,
          fromRate: number, toRate: number, 
          toCurrency: string | undefined) {
        this.fromCurrency = fromCurrency;
        this.amount = toFloat(amount) || 0;
        this.fromRate = fromRate;
        this.toRate = toRate;
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

    setAmount(amount: string){
        this.amount = parseFloat(amount);
    }
}

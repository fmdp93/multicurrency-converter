import { toFloat } from "./function";

export class CurrencyConverter {
    baseCurrency = "EUR";
    currency: string;
    amount: number;
    rate: number;
    targetRate: number;
    targetCurrency: string;

    constructor(currency: string, amount: string, rate: string, targetRate: string, targetCurrency: string) {
        this.currency = currency;
        this.amount = toFloat(amount);
        this.rate = toFloat(rate);
        this.targetRate = toFloat(targetRate);
        this.targetCurrency = targetCurrency;
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
        if (this.currency === this.baseCurrency)
            return this.amount * this.targetRate;
    }

    targetToBase() {
        if (
            this.currency !== this.baseCurrency &&
            this.targetCurrency === this.baseCurrency
        ) {
            return this.amount / this.rate;
        }
    }

    targetToTarget() {
        // target -> EUR -> target
        return (this.amount / this.rate) * this.targetRate;
    }
}

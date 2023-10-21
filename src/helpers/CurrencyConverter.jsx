import {toFloat} from "./function";

export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate, targetCurrency) {
        this.currency = currency;
        this.amount = toFloat(amount);
        this.rate = toFloat(rate);
        this.targetRate = targetRate;
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

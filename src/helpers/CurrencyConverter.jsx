export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate, targetCurrency) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
        this.targetRate = targetRate;
        this.targetCurrency = targetCurrency
    }

    getConversion() {
        let convertedAmount = 0;
        if ((convertedAmount = this.baseToTarget()) !== undefined)
            return convertedAmount;

        if ((convertedAmount = this.targetToBase()) !== undefined)
            return convertedAmount;     
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
}

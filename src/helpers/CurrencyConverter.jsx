export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
        this.targetRate = targetRate;
    }

    convertNow() {
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

    targetToBase(targetCurrency) {
        if (
            this.currency !== this.baseCurrency &&
            targetCurrency === this.baseCurrency
        ) {
            return this.amount / this.rate;
        }
    }
}

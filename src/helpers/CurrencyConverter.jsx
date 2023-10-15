export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
        this.targetRate = targetRate;
    }

    baseCurrencyToTargetCurrency() {
        if (this.currency === this.baseCurrency)
            return this.amount * this.targetRate;
    }

    targetCurrencyToBaseCurrency(targetCurrency) {
        if (
            this.currency !== this.baseCurrency &&
            targetCurrency === this.baseCurrency
        ) {
            return this.amount / this.rate;
        }
    }
}

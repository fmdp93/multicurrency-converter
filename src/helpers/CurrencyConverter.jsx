export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate, targetCurrency) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
        this.targetRate = targetRate;
        this.targetCurrency = targetCurrency;
    }
    baseCurrencyToTargetCurrency() {
        if (this.currency === this.baseCurrency)
            return this.amount * this.targetRate;
    }
}

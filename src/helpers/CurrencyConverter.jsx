export class CurrencyConverter {
    baseCurrency = "EUR";

    constructor(currency, amount, rate, targetRate) {
        this.currency = currency;
        this.amount = amount;
        this.rate = rate;
        this.targetRate = targetRate;
    }

    convertNow(){
        let convertedAmount = 0;
        convertedAmount = currencyConverter.baseCurrencyToTargetCurrency()
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

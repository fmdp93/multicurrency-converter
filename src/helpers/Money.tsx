class Money {
    number = "";
    dotIndex = undefined;
    dotAndcents = "";
    wholeNumbers = "";
    sliceStop = undefined;
    decimalPlaces = 2;

    constructor(number: string) {
        this.number = number;
        this.setDotIndex();
        this.setDotAndCents();
        this.setWholeNumbers();
    }

    setDotIndex() {
        this.dotIndex = this.number.indexOf(".");
        this.dotIndex = this.dotIndex === -1 ? undefined : this.dotIndex;
    }

    setDecimalPlaces(decimalPlaces){
        if(decimalPlaces > 0){
            this.sliceStop = this.dotIndex + decimalPlaces + 1;
        }
    }

    setDotAndCents() {
        if (this.dotIndex) {            
            this.dotAndcents = this.number.slice(this.dotIndex, this.sliceStop);
        }
    }
    setWholeNumbers() {
        this.wholeNumbers = this.number.slice(0, this.dotIndex);
    }
    getFormatted(): string {
        let numFormat = new Intl.NumberFormat("en-US");
        let formatted = numFormat.format(this.wholeNumbers);
        return formatted + this.dotAndcents;
    }
}

export default Money;

class Money {
    number = "";
    dotIndex: number | undefined = undefined;
    dotAndcents = "";
    wholeNumbers: number = 0;
    sliceStop: number | undefined = undefined;

    constructor(number: string) {
        this.number = number;
        this.setDotIndex();
        this.setSliceStop();
        this.setDotAndCents();
        this.setWholeNumbers();
    }

    setDotIndex() {
        this.dotIndex = this.number.indexOf(".");
        this.dotIndex = this.dotIndex === -1 ? undefined : this.dotIndex;
    }

    setSliceStop(decimalPlaces = 2){
        if(decimalPlaces > 0 && this.dotIndex !== undefined){
            this.sliceStop = this.dotIndex + decimalPlaces + 1;
        }
    }

    setDotAndCents() {
        if (this.dotIndex) {            
            this.dotAndcents = this.number.slice(this.dotIndex, this.sliceStop);
        }
    }
    setWholeNumbers() {
        this.wholeNumbers = parseFloat(this.number.slice(0, this.dotIndex));
    }
    getFormatted(): string {
        let numFormat = new Intl.NumberFormat("en-US");
        let formatted = numFormat.format(this.wholeNumbers);
        return formatted + this.dotAndcents;
    }
}

export default Money;

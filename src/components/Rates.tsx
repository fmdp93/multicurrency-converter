import { useState, useEffect, useContext, MutableRefObject, useRef } from "react";
import { CtxConverter } from "../context/ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { amountType } from "./ConversionInputs";
import { DragDrop } from "../helpers/DragDrop";
const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;
type RatesPropType = {
    arrayKey?: number,
    currencyRef?: React.RefObject<HTMLSelectElement>,
    amountRef?: React.RefObject<HTMLInputElement>,
    amount?: amountType,
    setAmount?: CallableFunction,
    defaultCurrency?: string,
    objDragDrop?: DragDrop | null,
}
const Rates = (
    {
        arrayKey,
        amount, amountRef, setAmount,
        currencyRef, defaultCurrency,
        objDragDrop,
    }: RatesPropType) => {
    const ctxConverter = useContext(CtxConverter);
    if (ctxConverter === null) {
        return;
    }

    const { sRates: rates, fromCurrency, setFromCurrency, baseAmount } = ctxConverter;
    const [currency, setCurrency] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState("");
    const handleChange = (currency: string) => {
        // if currency was changed and it is the fromCurrency 

        if (currentCurrency === fromCurrency) {
            // convert all currencies            
            setFromCurrency(currency);
        } else {
            if (amount && setAmount) {
                let fromRate = rates.filter(i => i[0] === fromCurrency)[0][1];
                let toRate = rates.filter(i => i[0] === currency)[0][1];

                const currencyConverter = new CurrencyConverter(
                    currency,
                    baseAmount,
                    fromRate,
                    toRate,
                    fromCurrency
                );

                let convertedAmount = currencyConverter.getConversion();
                let objMoney = new Money(convertedAmount.toString());

                setAmount({ ...amount, value: objMoney.getFormatted() })
            }
        }
        // else 
        // convert current currency

        setCurrency(currency);
    };

    useEffect(() => {
        setCurrentCurrency(currencyRef?.current?.value as string);
    }, [currency, fromCurrency])
    return (
        <>
            <select
                name="rate[]"
                className="currency"
                onChange={(e) => handleChange(e.target.value)}
                ref={currencyRef}
                value={currency || defaultCurrency}
            >
                {rates &&
                    rates.map((val: [string, number]) =>
                    (
                        <option
                            key={val[CURRENCY_INDEX]}
                            value={val[CURRENCY_INDEX]}
                        >
                            {val[CURRENCY_INDEX]}
                        </option>
                    )
                    )}
            </select>
        </>
    );
};

export default Rates;

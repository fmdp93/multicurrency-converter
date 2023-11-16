import { useState, useEffect, useContext, MutableRefObject, useRef } from "react";
import { ConvertContextType, CtxConverter } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { ratesToday } from "../../db/money";
import { amountType } from "./ConversionInputs";

const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;
type RatesPropType = {
    arrayKey?: number,
    currencyRef?: React.RefObject<HTMLSelectElement>,
    amountRef?: React.RefObject<HTMLInputElement>,
    amount?: amountType,
    setAmount?: CallableFunction;
    defaultCurrency?: string
}
const Rates = (
    {
        arrayKey,
        amount,
        amountRef,
        setAmount,
        currencyRef,
        defaultCurrency
    }: RatesPropType) => {
    const { rates, fromCurrency, setFromCurrency, baseAmount } =
        useContext(CtxConverter) as ConvertContextType
    const [currency, setCurrency] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState("");
    const handleChange = (currency: string) => {
        // if currency was changed and it is the fromCurrency 
        console.log(currentCurrency);
        console.log(fromCurrency);

        if (currentCurrency === fromCurrency) {
            // convert all currencies            
            setFromCurrency(currency);
        } else {            
            if (amount && setAmount) {                                            
                let fromRate = ratesToday.rates[fromCurrency];
                let toRate = ratesToday.rates[currency];
                
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
    }, [rates, currency, fromCurrency])
    return (
        <>
            <select
                className="currency"
                onChange={(e) => handleChange(e.target.value)}
                ref={currencyRef}
                value={currency || defaultCurrency}
            >
                {rates &&
                    rates.map((val: string[]) =>
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

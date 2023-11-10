import { useState, useEffect, useContext } from "react";
import { ConvertContextType, CtxConverter } from "./ConverterContext";
const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;

const Rates = ({ arrayKey, currencyRef, defaultCurrency }: {
    arrayKey: number, currencyRef: string, defaultCurrency: string
}) => {
    const { rates } =
        useContext(CtxConverter) as ConvertContextType
    const [currency, setCurrency] = useState("");

    const handleChange = (currency: string) => {
        setCurrency(currency);
    };

    useEffect(() => {
    }, [rates])
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

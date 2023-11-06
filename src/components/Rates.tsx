import { useState, useEffect, useContext } from "react";
import { CtxConverter } from "./ConverterContext";
const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;

const Rates = ({ arrayKey, currencyRef, defaultCurrency }) => {
    const { rates, setBaseCurrency } =
        useContext(CtxConverter);
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

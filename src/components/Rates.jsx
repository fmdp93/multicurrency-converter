
import { useState, useRef } from "react";
const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;

const Rates = ({
    rates,
    arrayKey,
    currencyRef,
    baseCurrency,
    setBaseCurrency,
    defaultCurrency
}) => {

    const [currency, setCurrency] = useState("");

    const handleChange = (currency) => {
        // trigger effect
        setCurrency(currency);
        setBaseCurrency(currency);
    };

    return (
        <>
        <select
            className="currency"
            onChange={(e) => handleChange(e.target.value)}
            ref={currencyRef}
            value={currency || defaultCurrency}
        >
            {rates &&
                rates.map((val, i) => (
                    <option key={val[CURRENCY_INDEX]} value={val[CURRENCY_INDEX]}>
                        {val[CURRENCY_INDEX]}
                    </option>
                ))}
        </select>
        </>
    );
};

export default Rates;

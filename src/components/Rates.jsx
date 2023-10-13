import { useState, useRef, useContext } from "react";
import { ConverterContext } from "../Home";
const CURRENCY_INDEX = 0;
const AMOUNT_INDEX = 1;

const Rates = ({ arrayKey, currencyRef, defaultCurrency }) => {
    const { rates, baseCurrency, setBaseCurrency, baseAmount, setBaseAmount } =
        useContext(ConverterContext);
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
                        <option
                            key={val[CURRENCY_INDEX]}
                            value={val[CURRENCY_INDEX]}
                        >
                            {val[CURRENCY_INDEX]}
                        </option>
                    ))}
            </select>
        </>
    );
};

export default Rates;

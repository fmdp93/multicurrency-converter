import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday } from "../../db/money";
import { ConverterContext } from "../Home";

const BASE_CURRENCY = "EUR";

const ConversionInputs = ({ arrayKey, defaultCurrency }) => {
    const { rates, baseCurrency, setBaseCurrency, baseAmount, setBaseAmount } =
        useContext(ConverterContext);
    const [amount, setAmount] = useState("");
    const amountRef = useRef("");
    const currencyRef = useRef("");
    let convertedAmount = 0;

    const handleChange = (amount) => {
        // trigger effect
        // console.log(arrayKey);
        setAmount(amount);
        setBaseAmount(amount);
        setBaseCurrency(currencyRef.current.value);
    };

    useEffect(() => {
        // console.log(arrayKey);
        let baseRate = ratesToday.rates[baseCurrency];
        let targetRate = ratesToday.rates[currencyRef.current.value];

        if (baseCurrency === BASE_CURRENCY) {
            convertedAmount = baseAmount * targetRate;
        } else if (
            baseCurrency !== BASE_CURRENCY &&
            currencyRef.current.value === BASE_CURRENCY
        ) {
            convertedAmount = baseAmount / baseRate;
        } else {
            // back to EUR
            convertedAmount = baseAmount / baseRate;

            // now it's EUR, EUR to USD
            convertedAmount = convertedAmount * targetRate;
        }

        if (currencyRef.current.value !== baseCurrency) {
            setAmount(convertedAmount || "");
        }
        console.log(baseCurrency);
    }, [baseAmount, baseCurrency]);

    return (
        <div className="row-input">
            <input
                type="text"
                className="currencyValue"
                value={amount}
                onChange={(e) => handleChange(e.target.value)}
                ref={amountRef}
            />
            <Rates
                rates={rates}
                arrayKey={arrayKey}
                currencyRef={currencyRef}
                baseCurrency={baseCurrency}
                setBaseCurrency={setBaseCurrency}
                defaultCurrency={defaultCurrency}
            ></Rates>
        </div>
    );
};

export default ConversionInputs;

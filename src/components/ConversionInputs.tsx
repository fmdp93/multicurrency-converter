import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday, ratesType } from "../../db/money";
import { CtxConverter, ConvertContextType } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { moneyIsValid } from "../helpers/validation";
import useInputTextPreventKeys from "../hooks/useInputTextPreventKeys";
import { signal } from "@preact/signals";

export type ConversionInputType = ({ arrayKey, defaultCurrency }: { arrayKey: number, defaultCurrency: string }) => JSX.Element;

let mainAmount = signal("0");

const ConversionInputs: ConversionInputType = ({ arrayKey, defaultCurrency }) => {
    const { rates, fromCurrency, setFromCurrency,
        baseAmount, setBaseAmount } =
        useContext<ConvertContextType | any>(CtxConverter)

    const [amount, setAmount] = useState({
        value: "",
        cursorPos: 0,
        ref: "",
    });
    const amountRef = useRef("");
    const currencyRef = useRef("");
    let allowedKeys = Array.from("1234567890.");
    allowedKeys = [
        ...allowedKeys,
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Delete",
        "Tab",
        "Control",
        "End",
        "Home",
    ];

    // useInputTextPreventKeys(amountRef, allowedKeys);    

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
        let eAmount = e.target.value.replaceAll(",", "");

        if (moneyIsValid(eAmount)) {
            setAmount({ ...amount, value: eAmount });
            setBaseAmount(eAmount);
            setBaseCurrency(currencyRef.current.value);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let objMoney = new Money(e.target.value);
        objMoney.setSliceStop(2);
        objMoney.setDotAndCents();
        let amountInMoneyFormat = objMoney.getFormatted();
        setAmount({ ...amount, value: amountInMoneyFormat });
    }

    const handleFocus = () => {
        setAmount({ ...amount, value: amount.value.replace(",", "") });
    }

    const handleToTopClick = () => {
        console.log(mainAmount.value++);
    }

    useEffect(() => {
        let fromRate = ratesToday.rates[fromCurrency];
        let toRate = ratesToday.rates[currencyRef.current.value];

        if (arrayKey === 0) {
            mainAmount.value = "90000";
        } else {
            rates.filter((val: ratesType) => {
                if (val[0] === currencyRef.current.value) {
                    mainAmount.value = parseFloat(mainAmount.value)
                }
            })

            const currencyConverter = new CurrencyConverter(
                fromCurrency,
                baseAmount,
                fromRate,
                toRate,
                currencyRef.current.value
            );

            let convertedAmount = currencyConverter.getConversion();
            let objMoney = new Money(convertedAmount.toString());
            setAmount({ ...amount, value: objMoney.getFormatted() });
        }

        if (baseAmount !== "") {
            if (!moneyIsValid(amount.value)) {
                return "";
            }

            // Convert money inputs except the user is typing
            if (currencyRef.current.value !== fromCurrency) {
                const currencyConverter = new CurrencyConverter(
                    fromCurrency,
                    baseAmount,
                    fromRate,
                    toRate,
                    currencyRef.current.value
                );
                let convertedAmount = currencyConverter.getConversion();
                let objMoney = new Money(convertedAmount.toString());
                setAmount({ ...amount, value: objMoney.getFormatted() });
            }
        }
    }, [baseAmount, fromCurrency]);

    return (
        <div className="row-input">
            <input
                type="text"
                className="currencyValue"
                value={amount.value}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
                onFocus={(e) => handleFocus()}
                ref={amountRef}
            />
            <Rates
                arrayKey={arrayKey}
                currencyRef={currencyRef}
                defaultCurrency={defaultCurrency}
            ></Rates>
            <button className="to-top" onClick={handleToTopClick}>&nbsp;</button>
        </div>
    );
};

export default ConversionInputs;

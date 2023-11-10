import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday, ratesType } from "../../db/money";
import { CtxConverter, ConvertContextType } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { moneyIsValid } from "../helpers/validation";
import useInputTextPreventKeys from "../hooks/useInputTextPreventKeys";
import { signal } from "@preact/signals";

type ConversionInputPropsType = 
{ arrayKey: number, defaultCurrency: string };

let mainAmount = signal(0);

const ConversionInputs = (
    { arrayKey, defaultCurrency }: ConversionInputPropsType) => {
    const { rates, fromCurrency, setFromCurrency,
        baseAmount, setBaseAmount } =
        useContext(CtxConverter) as ConvertContextType;

    const [amount, setAmount] = useState({
        value: "",
        cursorPos: 0,
        ref: "",
    });
    const amountRef = useRef<HTMLInputElement>(null);
    const currencyRef = useRef<HTMLSelectElement>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let eAmount = e.target.value.replaceAll(",", "");

        if (moneyIsValid(eAmount)) {
            setAmount({ ...amount, value: eAmount });
            setBaseAmount(eAmount);
            setFromCurrency(currencyRef.current?.value as string);
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
        let toRate = ratesToday.rates[currencyRef.current?.value as string];
        
        if (arrayKey === 0) {
            mainAmount.value = 90000;
        } else {
            rates.filter((val) => {                
                if (val[0] === currencyRef.current?.value) {
                    mainAmount.value = mainAmount.value
                }
            })

            const currencyConverter = new CurrencyConverter(
                fromCurrency,
                baseAmount,
                fromRate,
                toRate,
                currencyRef.current?.value
            );

            let convertedAmount = currencyConverter.getConversion();
            let objMoney = new Money(convertedAmount.toString());
            setAmount({ ...amount, value: objMoney.getFormatted() });
        }

        if (baseAmount !== "") {
            if (!moneyIsValid(amount.value)) {
                return undefined;
            }

            // Convert money inputs except the user is typing
            if (currencyRef.current?.value !== fromCurrency) {
                const currencyConverter = new CurrencyConverter(
                    fromCurrency,
                    baseAmount,
                    fromRate,
                    toRate,
                    currencyRef.current?.value
                );
                let convertedAmount = currencyConverter.getConversion();
                let objMoney = new Money(convertedAmount.toString());
                setAmount({ ...amount, value: objMoney.getFormatted() });
            }
        }

        return undefined;
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

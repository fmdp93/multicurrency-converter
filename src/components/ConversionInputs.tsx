import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday } from "../../db/money";
import { CtxConverter } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { moneyIsValid } from "../helpers/validation";
import useInputTextPreventKeys from "../hooks/useInputTextPreventKeys";

export type ConversionInputType = ({arrayKey , defaultCurrency}: any) => any;

const ConversionInputs: ConversionInputType = ({ arrayKey, defaultCurrency }) => {
    const { rates, baseCurrency, setBaseCurrency, baseAmount, setBaseAmount } =
        useContext(CtxConverter);
    const [amount, setAmount] = useState({
        value: "",
        cursorPos: 0,
        ref: "",
    });
    const [amountCursorPos, setAmountCursorPos] = useState(0);
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

    const handleChange = (e) => {
        // console.log(arrayKey);
        let eAmount = e.target.value.replaceAll(",", "");
        let cursorPos = e.target.selectionStart;
        setAmountCursorPos(cursorPos);

        if (moneyIsValid(eAmount)) {
            setAmount({...amount, value: eAmount});
            setBaseAmount(eAmount);
            setBaseCurrency(currencyRef.current.value);
        } else {
            // Prevent input cursor from going to the end
            e.target.blur();
            setTimeout(() => {
                e.target.setSelectionRange(cursorPos, cursorPos - 1);
                e.target.focus();
            }, 50);
        }
    };

    function repointCursor(){
        amountRef.current.selectionStart = amountCursorPos
        amountRef.current.blur();
        amountRef.current.focus();
        console.log('@' + amountRef.current.selectionStart);
    }

    useEffect(() => {
        // console.log('rendered');
        // console.log(`Index: ${arrayKey}`);        
        // console.log('repoint cursor: ' + (currencyRef.current.value === baseCurrency))
        
        if (baseAmount !== "") {
            let baseRate = ratesToday.rates[baseCurrency];
            let targetRate = ratesToday.rates[currencyRef.current.value];
            let amountInMoneyFormat: string = "";

            if (!moneyIsValid(amount.value)) {
                return "";
            }

            // For input that user is typing
            if (currencyRef.current.value === baseCurrency) {
                // repointCursor()
                let objMoney = new Money(amount.value.toString());
                amountInMoneyFormat = objMoney.getFormatted();
            }

            // converted money inputs
            if (currencyRef.current.value !== baseCurrency) {
                const currencyConverter = new CurrencyConverter(
                    baseCurrency,
                    baseAmount,
                    baseRate,
                    targetRate,
                    currencyRef.current.value
                );
                let convertedAmount = currencyConverter.getConversion();
                let objMoney = new Money(convertedAmount.toString());
                objMoney.setDecimalPlaces(2);
                objMoney.setDotAndCents();
                amountInMoneyFormat = objMoney.getFormatted();
            }

            setAmount({...amount, value: amountInMoneyFormat});
        }
    }, [baseAmount, baseCurrency]);

    return (
        <div className="row-input">
            <input
                type="text"
                className="currencyValue"
                value={amount.value}
                onChange={(e) => handleChange(e)}
                ref={amountRef}
            />
            <Rates
                arrayKey={arrayKey}
                currencyRef={currencyRef}
                defaultCurrency={defaultCurrency}
            ></Rates>
        </div>
    );
};

export default ConversionInputs;

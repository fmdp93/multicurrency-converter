import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday } from "../../db/money";
import { CtxConverter, ConvertContextType } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { moneyIsValid } from "../helpers/validation";
import useInputTextPreventKeys from "../hooks/useInputTextPreventKeys";
import { signal } from "@preact/signals";

type ConversionInputPropsType =
    { arrayKey: number, defaultCurrency: string };

export let mainAmount = signal("90,000");

const ConversionInputs = (
    { arrayKey, defaultCurrency }: 
    ConversionInputPropsType) => {
    const { rates, fromCurrency, setFromCurrency,
        baseAmount, setBaseAmount } = useContext(CtxConverter) as ConvertContextType;

    const [amount, setAmount] = useState({
        value: mainAmount.value,
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
            mainAmount.value = eAmount;
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
        // console.log(mainAmount.value++);
    }


    function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
        if(ev.target instanceof HTMLDivElement){            
            ev.target.style.setProperty("display", "flex")
        }
    }

    function handleDragEnd(ev: React.DragEvent<HTMLDivElement>) {
        if(ev.target instanceof HTMLDivElement){            
            ev.target.style.setProperty("display", "flex")
        }       
    }

    function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
    }

    function handleDrag(ev: React.DragEvent<HTMLDivElement>) {
        if(ev.target instanceof HTMLDivElement){            
            ev.target.style.setProperty("display", "none")
        }
    }

    useEffect(() => {
        if (baseAmount !== "") {
            let fromRate = ratesToday.rates[fromCurrency];
            let toRate = ratesToday.rates[currencyRef.current?.value as string];

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
        <div className="row-input" draggable="true"
            onDrag={(ev) => handleDrag(ev)}
            onDragEnd={(ev) => handleDragEnd(ev)}
            onDrop={(ev) => handleDrop(ev)}            
            onDragOver={(ev) => allowDrop(ev)}>
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
        </div>
    );
};

export default ConversionInputs;

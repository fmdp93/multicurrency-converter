import { useState, useRef, useEffect, useContext } from "react";
import Rates from "./Rates";
import { ratesToday } from "../../db/money";
import { CtxConverter, ConvertContextType } from "./ConverterContext";
import { CurrencyConverter } from "../helpers/CurrencyConverter";
import Money from "../helpers/Money";
import { moneyIsValid } from "../helpers/validation";
import useInputTextPreventKeys from "../hooks/useInputTextPreventKeys";
import { Signal, signal } from "@preact/signals";
import { DragDrop } from "../helpers/DragDrop";

export let lastModifiedTextInput = signal<React.RefObject<HTMLInputElement> | null>(null);

type ConversionInputPropsType =
    {
        arrayKey: number,
        defaultCurrency: string,
        objDragDrop?: DragDrop | null,
        setStateInputs: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>,
    };

export let mainAmount = signal("90,000");
export type amountType = {
    value: string,
    cursorPos: number,
    ref: string,
}

const ConversionInputs = (
    { arrayKey, defaultCurrency,
        objDragDrop,
        setStateInputs,
    }:
        ConversionInputPropsType) => {
    const { rates, fromCurrency, setFromCurrency,
        baseAmount, setBaseAmount,
        wasInitialized, setWasInitialized } =
        useContext(CtxConverter) as ConvertContextType;

    const [amount, setAmount] = useState<amountType>({
        value: mainAmount.value,
        cursorPos: 0,
        ref: "",
    });
    const amountRef = useRef<HTMLInputElement>(null);
    const currencyRef = useRef<HTMLSelectElement>(null);
    let allowedKeys = Array.from("1234567890.");
    allowedKeys = [
        ...allowedKeys,
        "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
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
            // update background color
            lastModifiedTextInput.value?.current?.classList.remove('input-primary');
            e.target.classList.add("input-primary");
            lastModifiedTextInput.value = amountRef;

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


    type swapInputsType = <T>(stateInputs: T[]) => T[];

    function swapInputs() {
        setStateInputs((stateInputs) => {
            if (stateInputs) {
                let holdingItemIndex: number | null = null;
                let droppedOnItemIndex: number | null = null;
                let holdingItem: JSX.Element;
                let droppedOnItem: JSX.Element;
                stateInputs.forEach((comp: JSX.Element, i: number) => {
                    if (stateInputs[i].props.arrayKey === objDragDrop?.holdingElKey) {
                        holdingItem = stateInputs[i];
                        holdingItemIndex = i;
                    }
                    if (stateInputs[i].props.arrayKey === objDragDrop?.dropOnRowElKey) {
                        droppedOnItem = stateInputs[i];
                        droppedOnItemIndex = i;
                    }
                })

                if (holdingItemIndex === null || droppedOnItemIndex === null) {
                    return stateInputs;
                }

                return stateInputs.map((comp: JSX.Element, i: number) => {
                    if (i === holdingItemIndex) {
                        return droppedOnItem;
                    }
                    if (i === droppedOnItemIndex) {
                        return holdingItem;
                    }
                    return comp;
                })
            }

            return [] as JSX.Element[];
        })
    }

    useEffect(() => {
        if (baseAmount !== "") {
            let fromRate = ratesToday.rates[fromCurrency];
            let toRate = ratesToday.rates[currencyRef.current?.value as string];

            if (!moneyIsValid(amount.value)) {
                return undefined;
            }

            // Convert money inputs except the user is typing
            if (amountRef.current?.parentElement
                ?.getAttribute("data-key")
                !==
                lastModifiedTextInput.value?.current?.parentElement
                    ?.getAttribute("data-key")) {
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

            if (arrayKey === 0 && wasInitialized === false) {
                // set first input as input-primary (amountFrom)
                lastModifiedTextInput.value = amountRef;
                lastModifiedTextInput.value.current?.classList.add("input-primary");
                setWasInitialized(true);
            }
        }
        return undefined;
    }, [baseAmount, fromCurrency]);

    return (
        <div className="row-input" draggable="true"
            data-key={arrayKey}
            onDrag={(ev) => { objDragDrop?.drag(ev) }}
            onDrop={(ev) => {
                objDragDrop?.drop(ev);
                swapInputs();
            }}
            onDragOver={(ev) => objDragDrop?.allowDrop(ev)}
            onDragEnd={(ev) => {
                if (ev.target instanceof HTMLDivElement) {
                    ev.target.style.setProperty("display", "flex");
                }
            }}
        >
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
                amountRef={amountRef}
                amount={amount}
                setAmount={setAmount}
                currencyRef={currencyRef}
                defaultCurrency={defaultCurrency}
            // objDragDrop={objDragDrop}
            ></Rates>
        </div>
    );
};

export default ConversionInputs;

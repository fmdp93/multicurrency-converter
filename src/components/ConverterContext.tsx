import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { mainAmount } from "./ConversionInputs";

export type ConvertContextType = {
    sRates: [string, number][],
    fromCurrency: string,
    setFromCurrency: Dispatch<SetStateAction<string>>,
    baseAmount: string,
    setBaseAmount: Dispatch<SetStateAction<string>>,
    wasInitialized: boolean,
    setWasInitialized: Dispatch<SetStateAction<boolean>>,
}

export const CtxConverter = createContext<ConvertContextType | null>(null);

type ConverterContextPropsType = {
    children: React.ReactNode,
    currency: string,
    sRates: [string, number][]
}

const ConverterContext = (
    { children, currency, sRates }
    : ConverterContextPropsType) => {
    useContext(CtxConverter);
    const [fromCurrency, setFromCurrency] = useState<string>(currency);
    const [baseAmount, setBaseAmount] = useState(mainAmount.value);
    const [wasInitialized, setWasInitialized] = useState(false);

    const contextVal: ConvertContextType = {
        sRates,
        fromCurrency,
        setFromCurrency,
        baseAmount,
        setBaseAmount,
        wasInitialized,
        setWasInitialized
    };

    useEffect(() => {
    }, [baseAmount, fromCurrency]);

    return (
        <CtxConverter.Provider
            value={contextVal}
        >
            {children}
        </CtxConverter.Provider>
    );
}

export default ConverterContext;
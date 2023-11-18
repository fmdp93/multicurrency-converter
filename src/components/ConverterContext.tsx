import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { ratesType } from "../../db/money";
import { mainAmount } from "./ConversionInputs";

export type ConvertContextType = {
    rates: [],
    fromCurrency: string,
    setFromCurrency: Dispatch<SetStateAction<string>>,
    baseAmount: string,
    setBaseAmount: Dispatch<SetStateAction<string>>,
    wasInitialized: boolean,    
    setWasInitialized: Dispatch<SetStateAction<boolean>>,
}

export const CtxConverter = createContext<ConvertContextType | null>(null);

const ConverterContext = ({children, currency, rates}: {
    children: React.ReactNode, currency: string, rates: []
}) => {
    useContext(CtxConverter);
    const [fromCurrency, setFromCurrency] = useState<string>(currency);
    const [baseAmount, setBaseAmount] = useState(mainAmount.value);
    const [wasInitialized, setWasInitialized] = useState(false);

    const contextVal: ConvertContextType = {
        rates,
        fromCurrency,
        setFromCurrency,
        baseAmount,
        setBaseAmount,
        wasInitialized,
        setWasInitialized
    };
    
    useEffect(()=>{
        // console.log(props.rates);
    },[baseAmount, fromCurrency]);

    return (
        <CtxConverter.Provider
            value={contextVal}
        >
            {children}
        </CtxConverter.Provider>
    );
}

export default ConverterContext;
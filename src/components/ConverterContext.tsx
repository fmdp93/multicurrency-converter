import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { ratesType } from "../../db/money";

export type ConvertContextType = {
    rates: [],
    fromCurrency: string,
    setFromCurrency: Dispatch<SetStateAction<string>>,
    baseAmount: number,
    setBaseAmount: Dispatch<SetStateAction<number>>,
}

export const CtxConverter = createContext<ConvertContextType | null>(null);

const ConverterContext = ({children, currency, rates}: {
    children: React.ReactNode, currency: string, rates: []
}) => {
    useContext(CtxConverter);
    const [fromCurrency, setFromCurrency] = useState<string>(currency);
    const [baseAmount, setBaseAmount] = useState(0);

    const contextVal: ConvertContextType = {
        rates,
        fromCurrency,
        setFromCurrency,
        baseAmount,
        setBaseAmount,
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
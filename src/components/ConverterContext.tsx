import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";


export type ConvertContextType = {
    rates: number | null,
    fromCurrency: string,
    setFromCurrency: Dispatch<SetStateAction<string>>,
    baseAmount: string,
    setBaseAmount: Dispatch<SetStateAction<string>>,
}

export const CtxConverter = createContext<ConvertContextType | null>(null);

const ConverterContext = (props: any) => {
    useContext(CtxConverter);
    const [fromCurrency, setFromCurrency] = useState<string>(props.currency);
    const [baseAmount, setBaseAmount] = useState("");

    const contextVal: ConvertContextType = {
        rates: props.rates,
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
            {props.children}
        </CtxConverter.Provider>
    );
}

export default ConverterContext;
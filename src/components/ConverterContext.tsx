import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";


type ConvertContextValue = {
    rates: number | null,
    baseCurrency: string,
    setBaseCurrency: Dispatch<SetStateAction<string>>,
    baseAmount: string,
    setBaseAmount: Dispatch<SetStateAction<string>>,
}

export const CtxConverter = createContext<ConvertContextValue | null>(null);

const ConverterContext = (props: any) => {
    useContext(CtxConverter);
    const [baseCurrency, setBaseCurrency] = useState<string>(props.currency);
    const [baseAmount, setBaseAmount] = useState<string>("");

    const contextVal: ConvertContextValue = {
        rates: props.rates,
        baseCurrency,
        setBaseCurrency,
        baseAmount,
        setBaseAmount,
    };
    useEffect(()=>{
        // console.log(props.rates);
    },[baseAmount, baseCurrency]);

    return (
        <CtxConverter.Provider
            value={contextVal}
        >
            {props.children}
        </CtxConverter.Provider>
    );
}

export default ConverterContext;
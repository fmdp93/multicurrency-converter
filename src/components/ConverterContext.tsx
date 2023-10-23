import { createContext, useContext, useState, useEffect } from "react";

export const CtxConverter = createContext(null);

const ConverterContext = (props: any) => {
    useContext(CtxConverter);
    const [baseCurrency, setBaseCurrency] = useState(props.currency);
    const [baseAmount, setBaseAmount] = useState("");

    useEffect(()=>{
        console.log(props.rates);
    },[baseAmount, baseCurrency]);

    return (
        <CtxConverter.Provider
            value={{
                rates: props.rates,
                baseCurrency,
                setBaseCurrency,
                baseAmount,
                setBaseAmount,
            }}
        >
            {props.children}
        </CtxConverter.Provider>
    );
}

export default ConverterContext;
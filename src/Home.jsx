import { useState, useEffect, useRef, useContext, createContext } from "react";
import ConversionInputs from "./components/Input";
import { Converter } from "./helpers/Converter";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";

export const ConverterContext = createContext(null);

const Home = () => {
    const MAIN_CURRENCY = "EUR";
    const SECONDARY_CURRENCY = "PHP";

    const [rates, setRates] = useState(null);
    const [baseCurrency, setBaseCurrency] = useState(0);
    const [baseAmount, setBaseAmount] = useState("");
    const defaultCurrencies = [MAIN_CURRENCY, SECONDARY_CURRENCY];

    const [inputSize, setInputSize] = useState(2);
    const [conversionInputsList, setConversionInputsList] = useState(null);
    const optionAddCurrency = useRef(null);

    const Converter = useContext(ConverterContext);

    useMoneyApi(setRates);

    function getInputs(inputSize) {
        let inputs = [];
        for (let i = 0; i < inputSize; i++) {
            inputs = [
                ...inputs,
                <ConversionInputs
                    key={i}
                    arrayKey={i}
                    defaultCurrency={defaultCurrencies[i]}
                ></ConversionInputs>,
            ];
        }
        return inputs;
    }

    const handleAddCurrency = () => {
        setInputSize(inputSize + 1);
    };

    useEffect(() => {
        if (rates) {
            setConversionInputsList(getInputs(inputSize));
        }
        // console.log(baseCurrency);
    }, [rates, inputSize, baseAmount, baseCurrency]);

    return (
        <div className="page-home">
            <h1>Convert</h1>
            <div className="converter">
                {rates && (
                    <ConverterContext.Provider
                        value={{
                            rates,
                            baseCurrency,
                            setBaseCurrency,
                            baseAmount,
                            setBaseAmount,
                        }}
                    >
                        {conversionInputsList &&
                            conversionInputsList.map((input) => input)}
                        <div className="row-input">
                            <button onClick={handleAddCurrency}>
                                Add Currency
                            </button>
                            <Rates
                                rates={rates}
                                inputRef={optionAddCurrency}
                                setBaseCurrency={setBaseCurrency}
                            ></Rates>
                        </div>
                    </ConverterContext.Provider>
                )}
            </div>
        </div>
    );
};

export default Home;

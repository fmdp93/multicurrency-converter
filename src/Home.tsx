import { useState, useEffect, useRef } from "react";
import ConversionInputs, { ConversionInputType } from "./components/ConversionInputs";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";
import ConverterContext from "./components/ConverterContext";


const Home = () => {
    const MAIN_CURRENCY = "EUR";
    const SECONDARY_CURRENCY = "PHP";

    const defaultCurrencies = [MAIN_CURRENCY, SECONDARY_CURRENCY];
    const [rates, setRates] = useState(null);

    const [inputSize, setInputSize] = useState(2);
    const [conversionInputsList, setConversionInputsList] = useState(null);
    const optionAddCurrency = useRef(null);

    useMoneyApi(setRates);

    function getInputs(inputSize: number): number {
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

    }, [rates, inputSize]);

    return (
        <div className="page-home">
            <h1>Convert</h1>
            <div className="converter">
                {rates && (
                    <ConverterContext rates={rates} currency={defaultCurrencies[0]}>
                        {conversionInputsList &&
                            conversionInputsList.map((input: ConversionInputType) => input)}
                        <div className="row-input">
                            <button onClick={handleAddCurrency}>
                                Add Currency
                            </button>
                            <Rates
                                inputRef={optionAddCurrency}
                            ></Rates>
                        </div>
                    </ConverterContext>
                )}
            </div>
        </div>
    );
};

export default Home;

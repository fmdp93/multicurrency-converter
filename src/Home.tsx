import { useState, useEffect, useRef } from "react";
import ConversionInputs, { ConversionInputType } from "./components/ConversionInputs";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";
import ConverterContext from "./components/ConverterContext";

const Home = () => {
    const CURRENCY_1 = "PHP";
    const CURRENCY_2 = "USD";
    const CURRENCY_3 = "EUR";

    const defaultCurrencies = [CURRENCY_1, CURRENCY_2, CURRENCY_3];
    const [rates, setRates] = useState<string | null>(null);

    const [inputSize, setInputSize] = useState(3);
    const [
        conversionInputsList,
        setConversionInputsList
    ] = useState<Array<JSX.Element> | null>(null);
    const optionAddCurrency = useRef(null);

    useMoneyApi(setRates);

    function getInputs(inputSize: number): Array<JSX.Element> {
        let inputs: Array<JSX.Element> = [];
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
            <h1>Multi Currency Converter</h1>
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

import { useState, useEffect, useRef } from "react";
import ConversionInputs from "./components/ConversionInputs";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";
import ConverterContext from "./components/ConverterContext";
import { effect, signal } from "@preact/signals";
import { Helmet } from "react-helmet";

export let inputs = signal<Array<JSX.Element> | null>(null);

const Home = () => {
    const defaultCurrencies = ["PHP", "USD", "EUR"];
    const [rates, setRates] = useState<[] | null>(null);

    const [inputSize, setInputSize] = useState(3);

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

    effect(()=>{
        if (rates) {            
            inputs.value = getInputs(inputSize);                 
        }
    });

    return (
        <div className="page-home">
            <Helmet>
                <title>{`${document.title} | Home`}</title>
            </Helmet>
            <h1>Multi Currency Converter</h1>
            <div className="converter">
                {rates && (
                    <ConverterContext rates={rates} currency={defaultCurrencies[0]}>
                        {inputs.value &&
                            inputs.value.map((input) => input)}
                        <div className="row-input">
                            <button onClick={handleAddCurrency}>
                                Add Currency
                            </button>
                            <Rates></Rates>
                        </div>
                    </ConverterContext>
                )}
            </div>
        </div>
    );
};

export default Home;

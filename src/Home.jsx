import { useState, useEffect, useRef } from "react";
import ConversionInputs from "./components/Input";
import { Converter } from "./helpers/Converter";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";

const Home = () => {
    const MAIN_CURRENCY = "EUR";
    const SECONDARY_CURRENCY = "PHP";

    const [rates, setRates] = useState(null);
    const [baseCurrency, setBaseCurrency] = useState(0);
    const [baseAmount, setBaseAmount] = useState("");
    const defaultCurrencies = [
        MAIN_CURRENCY,
        SECONDARY_CURRENCY,
    ];

    const [inputSize, setInputSize] = useState(2);
    const [conversionInputsList, setConversionInputsList] = useState(null);
    const optionAddCurrency = useRef(null);

    useMoneyApi(setRates);

    function getInputs(inputSize) {
        let inputs = [];
        for (let i = 0; i < inputSize; i++) {
            inputs = [
                ...inputs,
                <ConversionInputs
                    key={i}
                    arrayKey={i}
                    rates={rates}
                    baseCurrency={baseCurrency}
                    setBaseCurrency={setBaseCurrency}
                    baseAmount={baseAmount}
                    setBaseAmount={setBaseAmount}
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
        // console.log(optionRefs);        
    }, [rates, inputSize, baseAmount]);

    return (
        <div className="page-home">
            <h1>Convert</h1>
            {conversionInputsList && conversionInputsList.map((input) => input)}
            <button onClick={handleAddCurrency}>Add Currency</button>
            <Rates
                rates={rates}
                inputRef={optionAddCurrency}
                setBaseCurrency={setBaseCurrency}
            ></Rates>
        </div>
    );
};

export default Home;

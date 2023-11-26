import { useState, useEffect, useMemo } from "react";
import ConversionInputs from "./components/ConversionInputs";
import useMoneyApi from "./hooks/useMoneyApi";
import Rates from "./components/Rates";
import ConverterContext from "./components/ConverterContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DragDrop } from "./helpers/DragDrop";
import useStrictModeLogger from "./hooks/useStrictModeLogger";

const Home = () => {
    const defaultCurrencies = ["PHP", "USD", "AUD", "EUR"];
    // let objDragDrop = useMemo<DragDrop | null>(()=>{  
    //     return null;      
    // }, []);
    const [stateInputs, setStateInputs] = useState<JSX.Element[] | null>(null);
    const [objDragDrop, setObjDragDrop] = useState(new DragDrop);
    const [inputSize, setInputSize] = useState(defaultCurrencies.length);

    const {sRates, moneyError} = useMoneyApi();

    function getInputs<T>(inputSize: number): Array<T> {
        let inputs: Array<T> = [];
        for (let i = 0; i < inputSize; i++) {
            inputs = [
                ...inputs,
                <ConversionInputs
                    key={i}
                    arrayKey={i}
                    defaultCurrency={defaultCurrencies[i]}
                    objDragDrop={objDragDrop}
                    setStateInputs={setStateInputs}
                ></ConversionInputs> as T,
            ];
        }
        return inputs;
    }

    const handleAddCurrency = () => {
        setInputSize(inputSize + 1);
    };
    useEffect(() => {
        if (sRates) {
            setStateInputs(getInputs<JSX.Element>(inputSize));
        }
    }, [inputSize, objDragDrop, sRates])

    return (
        <div className="page-home">            
            <h1>Multi Currency Converter</h1>
            <div className="converter">
                {sRates && (                    
                    <ConverterContext
                        sRates={sRates}
                        currency={defaultCurrencies[0]}
                    >
                        {stateInputs &&
                            stateInputs.map((input) => input)}
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

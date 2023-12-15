import { useContext, useEffect } from "react";
import { CtxConverter, ConvertContextType } from "../context/ConverterContext";
import { Signal } from "@preact/signals";

type useInitializeFirstConversionInputType = {
    arrayKey: number;
    lastModifiedTextInput: Signal<React.RefObject<HTMLInputElement> | null>;
    amountRef: React.RefObject<HTMLInputElement>;
}

export const useInitializeFirstConversionInput = ({
    arrayKey,
    lastModifiedTextInput,
    amountRef }
    : useInitializeFirstConversionInputType) => {
    const ctxConverter = useContext(CtxConverter);
    if (ctxConverter === null) {
        return;
    }

    const { wasInitialized, setWasInitialized } = ctxConverter;

    useEffect(() => {
        if (arrayKey === 0 && wasInitialized === false) {
            // set first input as input-primary (amountFrom)
            lastModifiedTextInput.value = amountRef;
            lastModifiedTextInput.value.current?.classList.add("input-primary");
            setWasInitialized(true);
        }
    }, []);
}
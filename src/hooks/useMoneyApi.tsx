import { useEffect, useState } from "react";
import { latestCurrencyApiResponse } from "../../db/money";
import { useLocalStorage } from "./useLocalStorage";

const useMoneyApi = () => {
    const { setItem, removeItem, getItem } = useLocalStorage();
    const [sRates, setRates] = useState<[string, number][] | null>(null);
    const [moneyError, setMoneyError] = useState("");
    const [sRes, setRes] = useState(latestCurrencyApiResponse);

    function setRatesNow() {
        if (sRates === null) {
            let rs: [string, number][] | [] = [];
            for (const rate of Object.entries(sRes.data)) {
                rs = [...rs,
                [
                    rate[1].code,
                    rate[1].value
                ]
                ];
            }
            
            setRates(rs);
        }
    }

    useEffect(() => {
        const objAbortController = new AbortController();
        const hourNow = (new Date()).getHours();
        const MONEY_KEY = "latest-money-response";
        let cachedRes = JSON.parse(getItem(MONEY_KEY) ?? "");
        let setOnDateHour = (new Date(cachedRes?.requestTime).getHours());

        if (!cachedRes || (hourNow - setOnDateHour) >= 24) {
            const API_KEY = "KtKuyQe6FZiB54qoIXohivsNRkLtdffwQosfUcbK";
            const uri = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

            // LIVE
            fetch(uri, { signal: objAbortController.signal })
                .then((res) => {
                    return res.json();
                })
                .then(res => {
                    setRes(prev => res)
                    setItem(MONEY_KEY, { ...res, requestTime: Date.now() });
                    setRatesNow();
                })
                .catch((err) => {
                    setMoneyError(err);
                    setItem(MONEY_KEY, latestCurrencyApiResponse);
                }).finally(() => {
                    
                })
        }

        setRatesNow();

        return () => {
            objAbortController.abort();
        }
    }, [sRates]);

    return { sRates, moneyError };
};

export default useMoneyApi;

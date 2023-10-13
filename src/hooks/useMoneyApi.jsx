import { useEffect } from "react";
import { ratesToday } from "../../db/money";

const useMoneyApi = (setRates) => {
    useEffect(() => {
        // const API_KEY = "d96099fee475a7c4c256c09f86e27a8d";
        // fetch(uri)
        //     .then((res) => {
        //         console.log(res);
        //         return res.json();
        //     })
        //     .then((res) => {
        //         setMoney(res);
        //         console.log(res);
        //     });
        setRates(Object.entries(ratesToday.rates));
    }, []);
    return;
};

export default useMoneyApi;

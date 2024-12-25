import axios from 'axios';
import { useEffect, useState } from 'react';

export function useCurrencyInfo(currency){
    const [data, setData] = useState(0);
    useEffect(() => {
        axios.get(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
            .then((res) => {
                setData(res.data[currency])
            })
    }, [currency]);
    return data;
}

// https://latest.currency-api.pages.dev/v1/currencies/inr.json
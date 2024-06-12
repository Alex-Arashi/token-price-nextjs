import { useEffect, useState } from 'react';

require('dotenv').config();
const fetch = require('node-fetch');


export default function Token_Price () {
    const [price, setPrice] = useState(0)
    
    async function get_token_price() {
        console.log("getting token price")
        const url = 'https://pro-api.coingecko.com/api/v3/coins/black-dragon';
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_PRO_API_KEY}
        };
        
        let res = await fetch(url, options)
        let json = await res.json()
        setPrice(json.market_data.current_price.usd)
        console.log(json.market_data.current_price.usd)
    }
    get_token_price();

    useEffect(() => {
        const interval = setInterval(() => get_token_price(), 5000);

        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h2 className="mb-4">The price of Black Dragon token is: {price}</h2>
        </>
    );
}
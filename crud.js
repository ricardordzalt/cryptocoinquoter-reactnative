const QUOTE_PRICE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull?';

export const requestQuotePrice = ({ cryptocoin, coin }) => {
    return fetch(`${QUOTE_PRICE_URL}fsyms=${cryptocoin}&tsyms=${coin}`)
};
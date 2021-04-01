export const fetchTopCoins = () => {
    return fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
};
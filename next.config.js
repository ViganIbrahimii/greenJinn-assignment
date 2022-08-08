/** @type {import('next').NextConfig} */

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/tickervalues1",
        destination: "https://www.bitstamp.net/api/v2/ticker/btcusd",
      },
      {
        source: "/api/tickervalues3",
        destination: "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD",
      },
      {
        source: "/api/currencypairs",
        destination: "https://www.bitstamp.net/api/v2/trading-pairs-info/",
      },
      {
        source: "/api/specificpair/:id",
        destination: "https://www.bitstamp.net/api/v2/ticker/:id",
      },
    ];
  };
  return {
    rewrites,
    sassOptions: {
      prependData: `@import 'styles/config.scss';`,
    },
  };
};

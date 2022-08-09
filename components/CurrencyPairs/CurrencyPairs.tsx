import axios from "axios";
import { fetchCurrencies } from "components/api/CurrencyPairs";
import { useEffect, useState } from "react";
import { CurrencyPairButton } from "./CurrencyPairButton";
import styles from "./CurrencyPairs.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface CurrencyPairsProps {
  fetchSpecificPair: (url: string, name: string) => void;
}

const CurrencyPairs: React.FC<CurrencyPairsProps> = ({ fetchSpecificPair }) => {
  const [currencyPairsData, setCurrencyPairsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrencyPairs = async () => {
    const result = await fetchCurrencies();
    if ("error" in result) {
      console.log(result.message);
      return;
    }
    setCurrencyPairsData(result.value);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencyPairs();
  }, []);

  return (
    <div className={styles.currencyPairs}>
      {loading ? (
        <ClipLoader color={"#000000"} loading={loading} size={50} />
      ) : (
        currencyPairsData.map(
          (currencyPair: { url_symbol: string; name: string }, i: number) => (
            <CurrencyPairButton
              key={i}
              onClick={() =>
                fetchSpecificPair(currencyPair.url_symbol, currencyPair.name)
              }
              name={currencyPair.name}
            />
          )
        )
      )}
    </div>
  );
};
export default CurrencyPairs;

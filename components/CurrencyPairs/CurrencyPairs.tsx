import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyPairButton } from "./CurrencyPairButton";
import styles from "./CurrencyPairs.module.scss";

interface CurrencyPairsProps {
  fetchSpecificPair: any;
}
export const CurrencyPairs: React.FC<CurrencyPairsProps> = ({
  fetchSpecificPair,
}) => {
  const [currencyPairsData, setCurrencyPairsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrencyPairs = async () => {
    try {
      const { data } = await axios.get("/api/currencypairs");
      if (data) {
        setCurrencyPairsData(data);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCurrencyPairs();
  }, []);

  return (
    <div className={styles.currencyPairs}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        currencyPairsData.map((currencyPair: any, i: number) => (
          <CurrencyPairButton
            key={i}
            onClick={() =>
              fetchSpecificPair(currencyPair.url_symbol, currencyPair.name)
            }
            name={currencyPair.name}
          />
        ))
      )}
    </div>
  );
};

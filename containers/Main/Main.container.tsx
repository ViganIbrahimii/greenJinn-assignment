import axios from "axios";
import { AverageTickerValue } from "components/AverageTickerValue";
import { CurrencyPairs } from "components/CurrencyPairs/CurrencyPairs";
import { CurrencyChart } from "components/CurrencyChart";
import { useState } from "react";
import styles from "./MainContainer.module.scss";
import { GJNumbersView } from "components/TradingValues/GJNumbersView";

export const MainContainer = ({}) => {
  const [specificPair, setSpecificPair] = useState<any>({});
  const [specificPairTitle, setSpecificPairTitle] = useState<string>("");

  const fetchSpecificPair = async (url: string, name: string) => {
    try {
      const { data } = await axios.get(`/api/specificpair/${url}`);
      if (data) {
        setSpecificPair(data);
        setSpecificPairTitle(name);
        console.log(data, "data");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.valuesContainer}>
        <div className={styles.averageValue}>
          <AverageTickerValue />
        </div>
        <div className={styles.tradingPairs}>
          <div className={styles.currencyPairs}>
            <CurrencyPairs fetchSpecificPair={fetchSpecificPair} />
          </div>
          <div className={styles.bottomRightSide}>
            <GJNumbersView
              specificPair={specificPair}
              specificPairTitle={specificPairTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import axios from "axios";
import { AverageTickerValue } from "components/AverageTickerValue";
import { CurrencyPairs } from "components/CurrencyPairs/CurrencyPairs";
import { useState } from "react";
import styles from "./MainContainer.module.scss";

export const MainContainer = ({}) => {
  const [specificPair, setSpecificPair] = useState<any>();

  const fetchSpecificPair = async (url: string) => {
    try {
      const { data } = await axios.get(`/api/specificpair/${url}`);
      if (data) {
        setSpecificPair(data);
        console.log(data, "data");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <AverageTickerValue />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.topRightSide}>
          <CurrencyPairs fetchSpecificPair={fetchSpecificPair} />
        </div>
        <div className={styles.bottomRightSide}></div>
      </div>
    </div>
  );
};

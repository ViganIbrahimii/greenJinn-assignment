import styles from "./AverageTickerValue.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export const AverageTickerValue = () => {
  const [firstValue, setFirstValue] = useState<number>();
  const [secondValue, setSecondValue] = useState<number>();
  const [thirdValue, setThirdValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [averageValue, setAverageValue] = useState<number>();

  const fetchFirstValue = async () => {
    try {
      const { data } = await axios.get("/api/tickervalues1");
      if (data) {
        setFirstValue(parseFloat(data.last));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchSecondValue = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coinbase.com/v2/exchange-rates?currency=BTC"
      );
      if (data) {
        setSecondValue(parseFloat(data.data.rates.USD));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchThirdValue = async () => {
    try {
      const result = await axios.get("/api/tickervalues3");
      if (result) {
        setThirdValue(result.data[0][1]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const calculateAverageValue = async () => {
    await fetchFirstValue();
    await fetchSecondValue();
    await fetchThirdValue();
    if (firstValue && secondValue && thirdValue) {
      setAverageValue((firstValue + secondValue + thirdValue) / 3);
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateAverageValue();
  }, [firstValue, secondValue, thirdValue]);

  return (
    <div className={styles.container}>
      {loading ? <p>Loading</p> : <p>{averageValue}</p>}
    </div>
  );
};

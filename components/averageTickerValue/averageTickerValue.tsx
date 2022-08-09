import {
  firstTickerValue,
  secondTickerValue,
  thirdTickerValue,
} from "components/api/TickerValue";
import { useEffect, useState } from "react";
import styles from "./AverageTickerValue.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

export const AverageTickerValue = () => {
  const [firstValue, setFirstValue] = useState<number>(0);
  const [secondValue, setSecondValue] = useState<number>();
  const [thirdValue, setThirdValue] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [averageValue, setAverageValue] = useState<number>();

  const fetchFirstValue = async () => {
    const result = await firstTickerValue();
    if ("error" in result) {
      console.log(result.message);
      return;
    }
    setFirstValue(result.value);
  };

  const fetchSecondValue = async () => {
    const result = await secondTickerValue();
    if ("error" in result) {
      console.log(result.message);
      return;
    }
    setSecondValue(result.value);
  };

  const fetchThirdValue = async () => {
    const result = await thirdTickerValue();
    if ("error" in result) {
      console.log(result.message);
      return;
    }
    setThirdValue(result.value);
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
      {loading ? (
        <ClipLoader color={"#000000"} loading={loading} size={50} />
      ) : (
        <div className={styles.averageContainer}>
          <h3>Average Ticker Value:</h3>
          <p>{averageValue}</p>
        </div>
      )}
    </div>
  );
};

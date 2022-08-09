import axios from "axios";
import { AverageTickerValue } from "components/AverageTickerValue";
import { CurrencyPairs } from "components/CurrencyPairs/CurrencyPairs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MainContainer.module.scss";
import { GJNumbersView } from "components/TradingValues/GJNumbersView";
import dynamic, { Loader, LoaderComponent } from "next/dynamic";
import { CurrencyChartProps } from "../../components/CurrencyChart/CurrencyChart";

const CurrencyChartClient = dynamic<CurrencyChartProps>(
  () =>
    import("../../components/CurrencyChart/CurrencyChart").then(
      (mod) => mod.CurrencyChart
    ),
  { ssr: false }
);

export type ChartDataProps = { x: number; y: string }[];

export const MainContainer = ({}) => {
  const [specificPair, setSpecificPair] = useState({});
  const [specificPairTitle, setSpecificPairTitle] = useState("");
  const [chartType, setChartType] = useState("");
  const [chartData, setChartData] = useState<ChartDataProps>([]);

  const fetchSpecificPair = async (url: string, name: string) => {
    setChartData([]);
    setChartType("");
    try {
      const { data } = await axios.get(`/api/specificpair/${url}`);
      if (data) {
        setSpecificPair(data);
        setSpecificPairTitle(name);
        setChartType(url);
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
      <div className={styles.chartContainer}>
        <CurrencyChartClient
          chartType={chartType}
          chartData={chartData}
          setChartData={setChartData}
        />
      </div>
    </div>
  );
};

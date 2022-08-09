import { AverageTickerValue } from "../../components/AverageTickerValue/averageTickerValue";
import CurrencyPairs from "../../components/CurrencyPairs/CurrencyPairs";
import { useState } from "react";
import styles from "./MainContainer.module.scss";
import { GJNumbersView } from "../../components/TradingValues/GJNumbersView";
import dynamic from "next/dynamic";
import { CurrencyChartProps } from "../../components/CurrencyChart/CurrencyChart";
import { fetchSpecificCurrencyPair } from "../../components/api/CurrencyPairs";
import { CurrencyPairProps } from "../../components/interfaces/CurrencyChart";

const CurrencyChartClient = dynamic<CurrencyChartProps>(
  () =>
    import("../../components/CurrencyChart/CurrencyChart").then(
      (mod) => mod.CurrencyChart
    ),
  { ssr: false }
);

export type ChartDataProps = { x: number; y: string }[];

export const MainContainer = ({}) => {
  const [specificPair, setSpecificPair] = useState<CurrencyPairProps | {}>({});
  const [specificPairTitle, setSpecificPairTitle] = useState("");
  const [chartType, setChartType] = useState<string>("");
  const [chartData, setChartData] = useState<ChartDataProps>([]);
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSpecificPair = async (url: string, name: string) => {
    setShowView(false);
    setLoading(true);
    setChartData([]);
    setChartType("");
    const result = await fetchSpecificCurrencyPair(url);
    if ("error" in result) {
      console.log(result.message);
      return;
    }
    setSpecificPair(result.value);
    setSpecificPairTitle(name);
    setChartType(url);
    setLoading(false);
    setShowView(true);
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
          <div className={styles.viewContainer}>
            <GJNumbersView
              specificPair={specificPair}
              specificPairTitle={specificPairTitle}
              showView={showView}
              loading={loading}
            />
          </div>
        </div>
      </div>
      {chartType && (
        <div className={styles.chartContainer}>
          <CurrencyChartClient
            chartType={chartType}
            chartData={chartData}
            setChartData={setChartData}
          />
        </div>
      )}
    </div>
  );
};

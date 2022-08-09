import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import styles from "./CurrencyChart.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChartDataProps } from "containers/Main/Main.container";
import { fetchSpecificPairValue } from "components/api/CurrencyPairs";

export interface CurrencyChartProps {
  chartType: string;
  chartData: ChartDataProps;
  setChartData: Dispatch<SetStateAction<ChartDataProps>>;
}
export const CurrencyChart: React.FC<CurrencyChartProps> = ({
  chartType,
  chartData,
  setChartData,
}) => {
  let seconds = 0;

  const fetchChartsData = async () => {
    if (chartType) {
      const result = await fetchSpecificPairValue(chartType);
      if ("error" in result) {
        console.log(result.message);
        return;
      }
      setChartData((prev: ChartDataProps) => [
        ...prev,
        { x: seconds, y: result.value },
      ]);
    }
  };

  useEffect(() => {
    fetchChartsData();
    const interval = setInterval(() => {
      seconds += 10;
      fetchChartsData();
    }, 10000);
    return () => clearInterval(interval);
  }, [chartType]);

  const commonProperties = {
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
  };

  return (
    <div className={styles.chartContainer}>
      {chartData.length > 0 ? (
        <ResponsiveLine
          {...commonProperties}
          data={[{ id: "Value", data: chartData }]}
          useMesh={true}
          tooltip={({ point }) => {
            return (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <div>Time: {point.data.xFormatted}s</div>
                <div>Value: {point.data.yFormatted}</div>
              </div>
            );
          }}
          pointLabelYOffset={0}
          xScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          axisLeft={{
            legend: "Last Value",
            legendOffset: 12,
          }}
          axisBottom={{
            legend: "Time(seconds)",
            legendOffset: -12,
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

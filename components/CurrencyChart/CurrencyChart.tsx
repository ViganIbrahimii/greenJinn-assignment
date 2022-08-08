import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import styles from "./CurrencyChart.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChartDataProps } from "containers/Main/Main.container";

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
      try {
        const { data } = await axios.get(`/api/specificpair/${chartType}`);
        if (data) {
          setChartData((prev: ChartDataProps) => [
            ...prev,
            { x: seconds, y: data.last },
          ]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
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
            legend: "Value",
            legendOffset: 12,
          }}
          axisBottom={{
            legend: "Time(seconds)",
            legendOffset: -12,
          }}
        />
      ) : (
        <div>avzxxss</div>
      )}
    </div>
  );
};

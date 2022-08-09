export interface CurrencyProps {
  value: [];
}

export interface CurrencyChartProps {
  value: string;
}

export interface CurrencyPairProps {
  value: {
    ask?: string;
    bid?: string;
    high?: string;
    last?: string;
    low?: string;
    open?: string;
    open_24?: string;
    percent_change_24?: string;
    timestamp?: string;
    volume?: string;
    vwap?: string;
  };
}

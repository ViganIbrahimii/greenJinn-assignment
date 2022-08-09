import axios from "axios";
import {
  CurrencyChartProps,
  CurrencyPairProps,
  CurrencyProps,
} from "../interfaces/CurrencyChart";
import ErrorInterface from "../interfaces/error";

export const fetchCurrencies = async (): Promise<
  CurrencyProps | ErrorInterface
> => {
  try {
    const { data } = await axios.get(`/api/currencypairs`);
    return { value: data };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

export const fetchSpecificPairValue = async (
  chartType: string
): Promise<CurrencyChartProps | ErrorInterface> => {
  try {
    const { data } = await axios.get(`/api/specificpair/${chartType}`);
    return { value: data.last };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

export const fetchSpecificCurrencyPair = async (
  url: string
): Promise<CurrencyPairProps | ErrorInterface> => {
  try {
    const { data } = await axios.get(`/api/specificpair/${url}`);

    return { value: data };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

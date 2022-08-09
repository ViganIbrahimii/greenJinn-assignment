import axios from "axios";
import TickerValueInterface from "components/interfaces/TickerValue";
import ErrorInterface from "../interfaces/error";

export const firstTickerValue = async (): Promise<
  TickerValueInterface | ErrorInterface
> => {
  try {
    const { data } = await axios.get("/api/tickervalues1");
    return { value: parseFloat(data.last) };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

export const secondTickerValue = async (): Promise<
  TickerValueInterface | ErrorInterface
> => {
  try {
    const { data } = await axios.get(
      "https://api.coinbase.com/v2/exchange-rates?currency=BTC"
    );
    return { value: parseFloat(data.data.rates.USD) };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

export const thirdTickerValue = async (): Promise<
  TickerValueInterface | ErrorInterface
> => {
  try {
    const data = await axios.get("/api/tickervalues3");
    return { value: data.data[0][1] };
  } catch (err: any) {
    return {
      error: true,
      message: "Error",
    };
  }
};

import axios from "axios";
import FirstTickerValueInterface from "components/interfaces/TickerValue";
import ErrorInterface from "../interfaces/error";

export const firstTickerValue = async (): Promise<string | ErrorInterface> => {
  try {
    const { data } = await axios.get("/api/tickervalues1");
    return data.last;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};

import axios from "axios";

export const useApi = (baseURL: string) =>
  axios.create({
    baseURL: baseURL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
  });

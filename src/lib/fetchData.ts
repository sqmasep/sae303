import axios from "axios";
import { FetchedData } from "../types/data";

export const getData = async () => {
  const { data } = await axios.get<FetchedData>(
    "https://sat.inesctec.pt/api/v1/data"
  );
  return data;
};

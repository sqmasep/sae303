import axios from "axios";
import { FetchedData } from "../types/data";

export const benchmarkKeys = {
  all: ["benchmark"],
  byId: <T>(id: T) => ["benchmark", id],
};

export const getBenchmark = async () => {
  const { data } = await axios.get<FetchedData>(
    "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json"
  );
  return data[2].data;
};

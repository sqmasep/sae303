import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { benchmarkKeys, getBenchmark } from "../lib/fetchData";
import { Benchmark } from "../types/data";

interface Values {
  data: Benchmark[] | undefined;
  isLoading: boolean;
  status: "loading" | "error" | "success";
  colors: string[];
  families: string[] | undefined;
}

interface Props {
  children: React.ReactNode;
}

const BenchmarkContext = createContext<Values>({
  data: undefined,
  isLoading: false,
  status: "loading",
  colors: [],
  families: [],
});

const BenchmarkProvider: React.FC<Props> = ({ children }) => {
  const { data, isLoading, status } = useQuery(benchmarkKeys.all, getBenchmark);

  const filterBenchmark = (filter: (value: Benchmark) => unknown) =>
    data?.filter(filter);

  const families = data?.map(e => e.family);

  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ];

  if (status === "error") return <>Une erreur interne est survenue</>;

  return (
    <BenchmarkContext.Provider
      value={{ data, isLoading, status, colors, families }}
    >
      {children}
    </BenchmarkContext.Provider>
  );
};

export const useBenchmark = () => useContext(BenchmarkContext);
export default BenchmarkProvider;

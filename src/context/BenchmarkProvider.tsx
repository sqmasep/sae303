import React, { createContext, useContext, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { benchmarkKeys, getBenchmark } from "../lib/fetchData";
import { Benchmark } from "../types/data";
import { blue } from "@mui/material/colors";
import { average, strToIntArr } from "../utils/fp";

interface Values {
  data: Benchmark[] | undefined;
  isLoading: boolean;
  status: "loading" | "error" | "success";
  colors: string[];
  families: string[];
  solvers: string[];
  dataByStatus: (status: Benchmark["status"]) => Benchmark[];
  dataBySolver: (solver: string) => Benchmark[];
  avgsSolveTime: {
    name: string;
    avgTime: number;
  }[];
  bestSolvers: {
    name: string;
    nbOfSuccesses: number;
  }[];
}

interface Props {
  children: React.ReactNode;
}

const BenchmarkContext = createContext<Values>({
  data: [],
  isLoading: false,
  status: "loading",
  colors: [],
  families: [],
  solvers: [],
  dataByStatus: status => [],
  dataBySolver: solver => [],
  avgsSolveTime: [],
  bestSolvers: [],
});

const BenchmarkProvider: React.FC<Props> = ({ children }) => {
  const { data, isLoading, status } = useQuery(benchmarkKeys.all, getBenchmark);

  const solvers = [...new Set(data?.map(e => e.name))];
  const families = [...new Set(data?.map(e => e.family))];
  const dataByStatus = (status: Benchmark["status"]) =>
    data?.filter(benchmark => benchmark.status === status) ?? [];

  const dataBySolver = (solver: string) =>
    data?.filter(benchmark => benchmark.name === solver) ?? [];

  const avgsSolveTime = solvers.map(solver => ({
    name: solver,
    avgTime: average(strToIntArr(dataBySolver(solver).map(s => s.time))),
  }));

  const bestSolvers = solvers.map(solver => ({
    name: solver,
    nbOfSuccesses: dataBySolver(solver).reduce(
      (prev, val) => prev + (val.status === "SAT" ? 1 : 0),
      0
    ),
  }));

  const colors = Object.values(blue);

  if (status === "error") return <>Une erreur interne est survenue</>;

  return (
    <BenchmarkContext.Provider
      value={{
        data,
        isLoading,
        status,
        colors,
        families,
        solvers,
        dataBySolver,
        dataByStatus,
        avgsSolveTime,
        bestSolvers,
      }}
    >
      {children}
    </BenchmarkContext.Provider>
  );
};

export const useBenchmark = () => useContext(BenchmarkContext);
export default BenchmarkProvider;

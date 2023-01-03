import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { benchmarkKeys } from "../lib/fetchData";
import { useBenchmark } from "../context/BenchmarkProvider";
import { queryClient } from "../App";
import { Benchmark } from "../types/data";

const Detail: React.FC = () => {
  const { idBenchmark } = useParams();
  const {} = useQuery(benchmarkKeys.byId(idBenchmark), () => {
    queryClient
      .getQueryData<Benchmark[]>(benchmarkKeys.all)
      ?.find(e => e.id === idBenchmark);
  });
  return <div>Detail</div>;
};

export default Detail;

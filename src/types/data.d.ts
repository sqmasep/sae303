export interface Benchmark {
  id: string;
  name: string;
  fullname: string;
  family: string;
  competition_id: string;
  status: "SAT" | "UNSUPPORTED" | "UNKNOWN" | "UNSAT";
  nb_variables: string;
  nb_clauses: string;
  info_domains: string;
  info_constraints: string;
  useless_vars: string;
  created_at: string;
  updated_at: string;
  solver_id: string;
  benchmark_id: string;
  time: string;
}

export interface Table<TType extends string> {
  type: TType;
}

export type HeaderTable = Table<"header"> & {
  version: string;
  comment: string;
};
export type DatabaseTable = Table<"database"> & { name: string };
export type DataTable = Table<"data"> & { data: Benchmark[] };

export type FetchedData = [HeaderTable, DatabaseTable, DataTable];

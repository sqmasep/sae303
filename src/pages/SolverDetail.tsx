import React from "react";
import { useParams } from "react-router-dom";
import { useBenchmark } from "../context/BenchmarkProvider";
import { average, strToIntArr } from "../utils/fp";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { blue, lightBlue } from "@mui/material/colors";

const SolverDetail: React.FC = () => {
  const { solverName = "" } = useParams();
  const { solvers, dataBySolver, families, dataByStatus } = useBenchmark();
  const data = dataBySolver(solverName);

  const rankingByTimeWithNoTimeOut = solvers.map(solver => ({
    name: solver,
    avgTime: average(
      strToIntArr(
        dataBySolver(solver)
          .filter(d => d.status === "SAT" && parseInt(d.time) !== 10000)
          .map(d => d.time)
      ),
      3
    ),
  }));

  const aceRankingTime = rankingByTimeWithNoTimeOut.filter(
    d => d.name === solverName
  );

  return (
    <Container>
      <Typography variant='h1'>{solverName}</Typography>

      <Typography
        variant='h2'
        sx={{
          my: 8,
        }}
      >
        Ranking by time
      </Typography>

      {aceRankingTime ? (
        <>
          <Bar
            options={{
              indexAxis: "y",
              scales: {
                y: {
                  max: Math.max(...aceRankingTime.map(d => d.avgTime)),
                },
              },
              responsive: true,
            }}
            data={{
              labels: families,
              datasets: [
                {
                  label: "average time by family",
                  data: families.map(family => {
                    const familyData = data.filter(
                      d =>
                        d.family === family &&
                        d.status === "SAT" &&
                        parseInt(d.time) !== 10000
                    );
                    return average(strToIntArr(familyData.map(d => d.time)), 3);
                  }),
                  backgroundColor: [
                    ...Object.values(blue),
                    ...Object.values(lightBlue),
                  ],
                },
              ],
            }}
          />
        </>
      ) : (
        "pas trouvé :("
      )}

      <Typography
        variant='h2'
        sx={{
          my: 8,
        }}
      >
        Ranking by success
      </Typography>
      <Box sx={{ width: "50%", mx: "auto" }}>
        <Pie
          options={{
            responsive: true,
          }}
          data={{
            labels: ["SAT", "UNSAT", "UNKNOWN", "UNSUPPORTED"],
            datasets: [
              {
                label: "sat, unsat, unknown, unsupported",
                data: [
                  dataByStatus("SAT").length,
                  dataByStatus("UNSAT").length,
                  dataByStatus("UNKNOWN").length,
                  dataByStatus("UNSUPPORTED").length,
                ],
                backgroundColor: Object.values(blue),
              },
            ],
          }}
        />
      </Box>
    </Container>
  );
};

export default SolverDetail;

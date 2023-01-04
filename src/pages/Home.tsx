import React, { useState } from "react";
import { useBenchmark } from "../context/BenchmarkProvider";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Loading from "../component/Loading";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { average, strToIntArr } from "../utils/fp";
import { motion, Variants } from "framer-motion";

ChartJS.register(...registerables);

const parentVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childrenVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MotionGrid = motion(Grid);
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Home: React.FC = () => {
  const { dataByStatus, isLoading, solvers, families, colors, dataBySolver } =
    useBenchmark();

  const navigate = useNavigate();
  const sat = dataByStatus("SAT");

  return (
    <Container>
      <Box mt={4}>
        <MotionTypography
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          sx={{ my: 4 }}
          variant='h1'
        >
          Benchmark maincsp
        </MotionTypography>

        <MotionTypography
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          sx={{ mb: 8 }}
          variant='h5'
          component='h2'
        >
          slt text d'intro
        </MotionTypography>

        <Typography variant='h3' component='h2' sx={{ mb: 2 }}>
          Solvers utilisés
        </Typography>
        {solvers.length && (
          <MotionGrid
            variants={parentVariant}
            initial='hidden'
            animate='visible'
            container
            spacing={2}
            mb={8}
          >
            {solvers.map(solver => (
              <MotionGrid
                variants={childrenVariant}
                onClick={() => navigate(`/solver/${solver}`)}
                item
                key={solver}
                xs={12}
                sm={6}
                lg={4}
                xl={3}
              >
                <Card name={solver} />
              </MotionGrid>
            ))}
          </MotionGrid>
        )}

        {solvers.length && (
          <Box sx={{ height: 600 }}>
            <DataGrid
              rows={solvers.map(solver => ({
                id: solver,
                solver,
                sat: dataBySolver(solver).filter(d => d.status === "SAT")
                  .length,
                unsat: dataBySolver(solver).filter(d => d.status === "UNSAT")
                  .length,
                unknown: dataBySolver(solver).filter(
                  d => d.status === "UNKNOWN"
                ).length,
                unsupported: dataBySolver(solver).filter(
                  d => d.status === "UNSUPPORTED"
                ).length,
                averageTime: average(
                  strToIntArr(
                    dataBySolver(solver)
                      .filter(d => d.status === "SAT")
                      .map(d => d.time)
                  ),
                  3
                ),
              }))}
              columns={[
                { field: "solver", headerName: "Solver", width: 200 },
                { field: "sat", headerName: "SAT", width: 200 },
                { field: "unsat", headerName: "UNSAT", width: 200 },
                { field: "unknown", headerName: "UNKNOWN", width: 200 },
                { field: "unsupported", headerName: "UNSUPPORTED", width: 200 },
                {
                  field: "averageTime",
                  headerName: "Average time (in s)",
                  width: 200,
                },
              ]}
            />
          </Box>
        )}

        {isLoading && <Loading />}

        {sat &&
          families.map(family => (
            <MotionBox
              key={family}
              sx={{ my: 16 }}
              initial={{
                y: 50,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <MotionTypography
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                variant='h3'
              >
                Benchmark: {family}
              </MotionTypography>
              <Bar
                key={family}
                options={{
                  indexAxis: "y",
                  scales: {
                    y: {
                      max: Math.max(
                        ...sat
                          .filter(d => d.family === family)
                          .map(e => parseInt(e.time))
                      ),
                    },
                  },
                  responsive: true,
                }}
                data={{
                  labels: solvers,
                  datasets: [
                    {
                      label: `${family} by time`,
                      data: solvers.map(
                        solver =>
                          sat
                            .filter(
                              succeededBenchmark =>
                                succeededBenchmark.family === family
                            )
                            .find(e => e.name === solver)?.time
                      ),
                      borderColor: "rgb(75, 192, 192)",
                      backgroundColor: colors,
                    },
                  ],
                }}
              />
            </MotionBox>
          ))}
        {/* <Grid container spacing={1}>
        {data?.map(e => (
          <Grid key={e.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card date={e.updated_at} name={e.name} family={e.family} />
          </Grid>
        ))}
      </Grid> */}
      </Box>
    </Container>
  );
};

export default Home;

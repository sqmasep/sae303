import React, { useState } from "react";
import { useBenchmark } from "../context/BenchmarkProvider";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Container, Grid, Typography, Tabs, Tab } from "@mui/material";
import { dateFormat } from "../lib/dateFormat";
import Card from "../component/Card";

ChartJS.register(...registerables);

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data, isLoading } = useBenchmark();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label='Item One' />
        <Tab label='Item Two' />
      </Tabs>
      <Typography variant='h1'>Home</Typography>
      {isLoading && <h2>Loading...</h2>}

      <Grid container spacing={4}>
        {data?.map(e => (
          <Grid key={e.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card date={e.updated_at} name={e.name} family={e.family} />
          </Grid>
        ))}
      </Grid>

      <Line
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </Container>
  );
};

export default Home;

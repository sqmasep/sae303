import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import BenchmarkProvider from "./context/BenchmarkProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Detail from "./pages/Detail";

export const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BenchmarkProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:idBenchmark' element={<Detail />} />
          </Routes>
        </BenchmarkProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

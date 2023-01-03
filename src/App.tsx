import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";

export const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;

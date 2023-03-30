import React from "react";
import { Route, Routes } from "react-router-dom";

import { useTheme } from "./theme/useTheme";
import { Login } from "./Page/LoginPage/Login";
import { Layout } from "./component/Layout/Layout";
import { Register } from "./Page/RegisterPage/Register";

import { ThemeProvider } from "@mui/material";
import { Dashboard } from "./Page/DashboardPage/Dashboard";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;

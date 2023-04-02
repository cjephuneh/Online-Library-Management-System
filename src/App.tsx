import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useTheme } from "./theme/useTheme";
import { Login } from "./Page/LoginPage/Login";
import { Layout } from "./component/Layout/Layout";
import { Library } from "./Page/LibraryPage/Library";
import { Register } from "./Page/RegisterPage/Register";
import { useGetBook } from "./Page/LibraryPage/useGetBook";
import { Dashboard } from "./Page/DashboardPage/Dashboard";
import { BookDetail } from "./Page/BookDetailPage/BookDetail";
import { ForgetPassword } from "./Page/ForgetPasswordPage/ForgetPassword";

import { ThemeProvider } from "@mui/material";

const App: React.FC = () => {
  const { theme } = useTheme();

  const { sendGetBookRequest } = useGetBook();

  React.useEffect(() => {
    sendGetBookRequest();
  }, [sendGetBookRequest]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:bookID/:bookSLUG" element={<BookDetail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/" element={<Navigate to="library" />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;

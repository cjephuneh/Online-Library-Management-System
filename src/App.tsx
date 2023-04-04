import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useTheme } from "./theme/useTheme";
import { Login } from "./Page/LoginPage/Login";
import { Layout } from "./component/Layout/Layout";
import { Library } from "./Page/LibraryPage/Library";
import { Register } from "./Page/RegisterPage/Register";
import { useDecodedToken } from "./hooks/useDecodedToken";
import { useGetBook } from "./Page/LibraryPage/useGetBook";
import { Dashboard } from "./Page/DashboardPage/Dashboard";
import { BookDetail } from "./Page/BookDetailPage/BookDetail";
import { ForgetPassword } from "./Page/ForgetPasswordPage/ForgetPassword";

import { ThemeProvider } from "@mui/material";
import { Admin } from "./Page/AdminPage/Admin";

const App: React.FC = () => {
  const { theme } = useTheme();

  const { bookLoading, bookError, sendGetBookRequest } = useGetBook();

  React.useEffect(() => {
    sendGetBookRequest();
  }, [sendGetBookRequest]);

  const { token, is_staff } = useDecodedToken();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/library"
            element={
              <Library bookLoading={bookLoading} bookError={bookError} />
            }
          />
          <Route path="/library/:bookID/:bookSLUG" element={<BookDetail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/admin"
            element={is_staff ? <Admin /> : <Navigate to="/library" />}
          />
          <Route path="/" element={<Navigate to="/library" />} />
          <Route path="*" element={"Page Not Found!"} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;

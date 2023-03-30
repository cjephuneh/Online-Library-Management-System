import React from "react";
import { Link } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTheme } from "../../theme/useTheme";
import { LoginDataType, schema } from "./LoginZod";
import { LoginInputField } from "./LoginInputField";
import { CustomInput } from "../../component/CustomInput/CustomInput";
import { useLogin } from "./useLogin";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import LoginIcon from "@mui/icons-material/Login";

export const Login = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { loginLoading, sendLoginRequest } = useLogin();

  const onLoginFormSubmitHandler: SubmitHandler<LoginDataType> = (data) => {
    sendLoginRequest(data);
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Paper
        elevation={smallScreen ? 0 : 4}
        sx={{
          width: { xs: "100vw", sm: 400 },
          py: 4,
          px: 2,
          borderRadius: 2.5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Sign In
        </Typography>
        <FormProvider {...methods}>
          <Stack
            gap={2}
            component={"form"}
            noValidate
            onSubmit={methods.handleSubmit(onLoginFormSubmitHandler)}
          >
            {LoginInputField.map((item) => (
              <CustomInput key={item.id} {...item} />
            ))}
            <Link to="/forget-password">Forget Password?</Link>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={loginLoading}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              sx={{ borderRadius: 5, fontWeight: 700, py: 1 }}
            >
              Sign In
            </LoadingButton>
            <Divider>or</Divider>
            <Typography variant="body2" textAlign={"center"}>
              New to Online Library?{" "}
              <Link to="/register" color="primary">
                Join Now
              </Link>
            </Typography>
          </Stack>
        </FormProvider>
      </Paper>
    </Box>
  );
};

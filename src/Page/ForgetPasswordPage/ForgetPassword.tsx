import React from "react";
import { Link } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForgetPassword } from "./useForgetPassword";
import { useTheme } from "../../theme/useTheme";
import { CustomInput } from "../../component/CustomInput/CustomInput";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import LoginIcon from "@mui/icons-material/Login";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgetPasswordInputField = [
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    startIcon: <AlternateEmailIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
  },
];
export type ForgetPasswordDataType = z.infer<typeof schema>;

export const ForgetPassword = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const { forgetPasswordLoading, sendForgetPasswordRequest } =
    useForgetPassword();

  const onLoginFormSubmitHandler: SubmitHandler<ForgetPasswordDataType> = (
    data
  ) => {
    sendForgetPasswordRequest(data);
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
          Forget Password
        </Typography>
        <FormProvider {...methods}>
          <Stack
            gap={2}
            component={"form"}
            noValidate
            onSubmit={methods.handleSubmit(onLoginFormSubmitHandler)}
          >
            {ForgetPasswordInputField.map((item) => (
              <CustomInput key={item.id} {...item} />
            ))}
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={forgetPasswordLoading}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              sx={{ borderRadius: 5, fontWeight: 700, py: 1 }}
            >
              Send Password Reset Link
            </LoadingButton>
            <Divider>or</Divider>
            <Typography variant="body2" textAlign={"center"}>
              Already have a account?{" "}
              <Link to="/login" color="primary">
                Sign In
              </Link>
            </Typography>
          </Stack>
        </FormProvider>
      </Paper>
    </Box>
  );
};

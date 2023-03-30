import React from "react";
import { Link } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTheme } from "../../theme/useTheme";
import { CustomInput } from "../../component/CustomInput/CustomInput";
import { useRegister } from "./useRegister";
import { RegisterDataType, schema } from "./RegisterZod";
import { RegisterInputField } from "./RegisterInputField";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import LoginIcon from "@mui/icons-material/Login";

export const Register = () => {
  const methods = useForm({
    defaultValues: {
      fname: "",
      email: "",
      password: "",
      password2: "",
    },
    resolver: zodResolver(schema),
  });

  const { registerLoading, sendRegisterRequest } = useRegister();

  const onRegisterFormSubmitHandler: SubmitHandler<RegisterDataType> = (
    data
  ) => {
    sendRegisterRequest(data);
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        elevation={smallScreen ? 0 : 4}
        sx={{
          width: { xs: "100vw", md: 400 },
          py: 4,
          px: 2,
          borderRadius: 2.5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Join Online Library
        </Typography>
        <FormProvider {...methods}>
          <Stack
            gap={2}
            component={"form"}
            noValidate
            onSubmit={methods.handleSubmit(onRegisterFormSubmitHandler)}
          >
            {RegisterInputField.map((item) => (
              <CustomInput key={item.id} {...item} />
            ))}
            <Typography variant="body2" textAlign={"center"}>
              By clicking Agree & Join, you agree to the Library{" "}
              <Link to="">User Agreement</Link>,{" "}
              <Link to="">Privacy Policy</Link> and{" "}
              <Link to="">Cookie Policy</Link>
            </Typography>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={registerLoading}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              sx={{ borderRadius: 5, fontWeight: 700, py: 1 }}
            >
              Agree & Join
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
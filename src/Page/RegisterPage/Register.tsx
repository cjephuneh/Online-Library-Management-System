import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useTheme } from "../../theme/useTheme";
import { CustomInput } from "../../component/CustomInput/CustomInput";
import { useRegister } from "./useRegister";
import { RootState } from "../../redux/redux";
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
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (token) {
    navigate("/library");
  }

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          background: smallScreen ? "#dee2e6" : "#fff",
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

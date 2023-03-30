import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { LoginDataType } from "./LoginZod";
import { authActions } from "../../redux/authSlice";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<boolean>(false);

  const sendLoginRequest = async (formData: LoginDataType) => {
    setLoginLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL! + "/jwt/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      dispatch(authActions.updateToken(response.data));
      setLoginLoading(false);
    } catch (error) {
      toast.error(
        "Login Failed! Please double check your credential and try again."
      );
      setLoginError(true);
      setLoginLoading(false);
    }
  };

  return { loginLoading, loginError, sendLoginRequest };
};

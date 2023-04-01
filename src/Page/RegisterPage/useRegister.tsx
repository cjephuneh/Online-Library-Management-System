import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { RegisterDataType } from "./RegisterZod";
import { useLogin } from "../LoginPage/useLogin";

export const useRegister = () => {
  const { sendLoginRequest } = useLogin();

  const [registerLoading, setRegisterLoading] = React.useState<boolean>(false);
  const [registerError, setRegisterError] = React.useState<boolean>(false);

  const sendRegisterRequest = async (formData: RegisterDataType) => {
    setRegisterLoading(true);
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL! + "/auth/users/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          full_name: formData.fname,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        },
      });

      sendLoginRequest({ email: formData.email, password: formData.password });
      setRegisterLoading(false);
    } catch (error) {
      toast.error("Register Failed!");
      setRegisterError(true);
      setRegisterLoading(false);
    }
  };

  return { registerLoading, registerError, sendRegisterRequest };
};

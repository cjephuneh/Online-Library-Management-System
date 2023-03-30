import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { ForgetPasswordDataType } from "./ForgetPassword";

export const useForgetPassword = () => {
  const [forgetPasswordLoading, setForgetPasswordLoading] =
    React.useState<boolean>(false);
  const [forgetPasswordError, setForgetPasswordError] =
    React.useState<boolean>(false);

  const sendForgetPasswordRequest = async (
    formData: ForgetPasswordDataType
  ) => {
    setForgetPasswordLoading(true);
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL! + "/forget-password/",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      toast.success(
        "Email with password reset link is sent. Please check your email."
      );
      setForgetPasswordLoading(false);
    } catch (error) {
      toast.error("Functunality still not added!");
      setForgetPasswordError(true);
      setForgetPasswordLoading(false);
    }
  };

  return {
    forgetPasswordLoading,
    forgetPasswordError,
    sendForgetPasswordRequest,
  };
};

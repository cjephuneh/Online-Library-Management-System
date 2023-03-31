import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/redux";
import { useAxios } from "../../AxiosInterceptor/useAxios";
import { useGetBook } from "../LibraryPage/useGetBook";

export const useBookReserve = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { axiosInstance } = useAxios();

  const { sendGetBookRequest } = useGetBook();

  const navigate = useNavigate();

  const [reserveLoading, setReserveLoading] = React.useState<boolean>(false);
  const [reserveError, setReserveError] = React.useState<boolean>(false);

  const sendReserveRequest = async (formData: { random: string }) => {
    setReserveLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to reserve books.");
    }

    try {
      await axiosInstance({
        method: "POST",
        url: process.env.REACT_APP_BASE_URL! + "/books/1/borrow/",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      sendGetBookRequest();
      setReserveLoading(false);
    } catch (error) {
      toast.error("Something went wrong while completing your request!");
      setReserveError(true);
      setReserveLoading(false);
    }
  };

  return { reserveLoading, reserveError, sendReserveRequest };
};
import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/redux";
import { useAxios } from "../../AxiosInterceptor/useAxios";
import { useGetBook } from "../LibraryPage/useGetBook";

export const useBookBorrow = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { axiosInstance } = useAxios();

  const { sendGetBookRequest } = useGetBook();

  const navigate = useNavigate();

  const [borrowLoading, setBorrowLoading] = React.useState<boolean>(false);
  const [borrowError, setBorrowError] = React.useState<boolean>(false);

  const sendBorrowRequest = async (formData: { random: string }) => {
    setBorrowLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to borrow books.");
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
      setBorrowLoading(false);
    } catch (error) {
      toast.error("Something went wrong while completing your request!");
      setBorrowError(true);
      setBorrowLoading(false);
    }
  };

  return { borrowLoading, borrowError, sendBorrowRequest };
};
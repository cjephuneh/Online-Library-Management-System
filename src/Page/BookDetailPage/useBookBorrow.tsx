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

  const sendBorrowRequest = async (bookID: string, bookSLUG: string) => {
    setBorrowLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to borrow books.");
    }

    try {
      await axiosInstance({
        method: "PUT",
        url:
          process.env.REACT_APP_BASE_URL! +
          `/book/book/${bookID}/${bookSLUG}/update/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          status: "B",
        },
      });

      sendGetBookRequest();
      setBorrowLoading(false);
      toast.success("Congrats! You have successfully borrowed the books.");
    } catch (errors: any) {
      toast.error(errors.response.data[0]);
      setBorrowError(true);
      setBorrowLoading(false);
    }
  };

  return { borrowLoading, borrowError, sendBorrowRequest };
};

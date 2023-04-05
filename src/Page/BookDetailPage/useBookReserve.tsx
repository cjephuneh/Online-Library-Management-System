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

  const sendReserveRequest = async (bookID: string, bookSLUG: string) => {
    setReserveLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to reserve books.");
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
        data: { status: "R" },
      });

      sendGetBookRequest();
      setReserveLoading(false);
      toast.success("Congrats! You have successfully reserved the books.");
    } catch (errors: any) {
      toast.error(errors.response.data);
      setReserveError(true);
      setReserveLoading(false);
    }
  };

  return { reserveLoading, reserveError, sendReserveRequest };
};

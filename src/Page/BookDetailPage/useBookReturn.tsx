import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/redux";
import { useAxios } from "../../AxiosInterceptor/useAxios";
import { useGetBook } from "../LibraryPage/useGetBook";

export const useBookReturn = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { axiosInstance } = useAxios();

  const { sendGetBookRequest } = useGetBook();

  const navigate = useNavigate();

  const [returnLoading, setReturnLoading] = React.useState<boolean>(false);
  const [returnError, setReturnError] = React.useState<boolean>(false);

  const sendReturnRequest = async (bookID: string, bookSLUG: string) => {
    setReturnLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to Return books.");
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
        data: { status: "A" },
      });

      sendGetBookRequest();
      setReturnLoading(false);
      toast.success("Congrats! You have successfully returned the books.");
    } catch (error) {
      toast.error("Something went wrong while completing your request!");
      setReturnError(true);
      setReturnLoading(false);
    }
  };

  return { returnLoading, returnError, sendReturnRequest };
};

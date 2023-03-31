import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/redux";

export const useBookBorrow = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [borrowLoading, setBorrowLoading] = React.useState<boolean>(false);
  const [borrowError, setBorrowError] = React.useState<boolean>(false);

  const sendBorrowRequest = async () => {
    setBorrowLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to borrow books.");
    }

    try {
      setBorrowLoading(false);
    } catch (error) {
      toast.error("Something went wrong while completing your request!");
      setBorrowError(true);
      setBorrowLoading(false);
    }
  };

  return { borrowLoading, borrowError, sendBorrowRequest };
};

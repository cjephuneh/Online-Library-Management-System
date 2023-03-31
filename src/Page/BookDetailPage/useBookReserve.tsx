import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/redux";

export const useBookReserve = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [reserveLoading, setReserveLoading] = React.useState<boolean>(false);
  const [reserveError, setReserveError] = React.useState<boolean>(false);

  const sendReserveRequest = async () => {
    setReserveLoading(true);

    if (!token) {
      navigate("/login");
      return toast.warning("Login required to reserve books.");
    }

    try {
      setReserveLoading(false);
    } catch (error) {
      toast.error("Something went wrong while completing your request!");
      setReserveError(true);
      setReserveLoading(false);
    }
  };

  return { reserveLoading, reserveError, sendReserveRequest };
};

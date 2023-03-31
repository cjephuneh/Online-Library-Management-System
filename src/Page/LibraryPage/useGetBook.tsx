import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

import { bookActions } from "../../redux/bookSlice";

export const useGetBook = () => {
  const dispatch = useDispatch();

  const [bookLoading, setBookLoading] = React.useState<boolean>(false);
  const [bookError, setBookError] = React.useState<boolean>(false);

  const sendGetBookRequest = React.useCallback(async () => {
    setBookLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL! + "/books",
      });

      dispatch(bookActions.setBooks(response.data));
      setBookLoading(false);
    } catch (error) {
      setBookError(true);
      setBookLoading(false);
    }
  }, [dispatch]);

  return { bookLoading, bookError, sendGetBookRequest };
};

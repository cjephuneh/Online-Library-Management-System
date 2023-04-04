import axios from "axios";
import React from "react";
import { BookDataType } from "../../redux/bookSlice";

interface UserDataType {
  email: string;
  borrowed_book_collection: BookDataType[];
}

export const useGetBRBooks = () => {
  const [bookData, setBookData] = React.useState<BookDataType[]>();
  const [bookLoading, setBookLoading] = React.useState<boolean>(false);
  const [bookError, setBookError] = React.useState<boolean>(false);

  const sendGetBookRequest = React.useCallback(async (userEmail: string) => {
    setBookLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL! + "/auth/user-list/",
      });

      const userData = response.data.filter(
        (item: UserDataType) => item.email === userEmail
      );

      setBookData(userData[0].borrowed_book_collection);
      setBookLoading(false);
    } catch (error) {
      setBookError(true);
      setBookLoading(false);
    }
  }, []);

  return { bookData, bookLoading, bookError, sendGetBookRequest };
};

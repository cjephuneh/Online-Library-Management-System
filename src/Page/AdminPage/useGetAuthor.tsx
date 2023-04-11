import React from "react";
import axios from "axios";

import { BookDataType } from "../../redux/bookSlice";

export interface AuthorDataType {
  id: number;
  full_name: string;
  about: string;
  photo: string;
  nationality: string;
  author_book_collection: BookDataType;
}

export const useGetAuthor = () => {
  const [authorData, setGetAuthorData] = React.useState<AuthorDataType[]>();
  const [authorError, setAuthorError] = React.useState<boolean>(false);

  const sendGetAuthorRequest = React.useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + "/book/author/",
      });

      setGetAuthorData(response.data);
    } catch (errors) {
      setAuthorError(true);
    }
  }, []);

  return { authorData, authorError, sendGetAuthorRequest };
};

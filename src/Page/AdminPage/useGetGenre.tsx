import React from "react";
import axios from "axios";

import { BookDataType } from "../../redux/bookSlice";

export interface GenreDataType {
  id: number;
  name: string;
  about: string;
  genre_book_collection: BookDataType;
}

export const useGetGenre = () => {
  const [genreData, setGetGenreData] = React.useState<GenreDataType[]>();
  const [genreError, setGenreError] = React.useState<boolean>(false);

  const sendGetGenreRequest = React.useCallback(async () => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + "/book/genre/",
      });

      setGetGenreData(response.data);
    } catch (errors) {
      setGenreError(true);
    }
  }, []);

  return { genreData, genreError, sendGetGenreRequest };
};

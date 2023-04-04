import axios from "axios";
import React from "react";

interface GenreDataType {
  id: number;
  name: string;
  about: string;
}

export const useGetGenre = () => {
  const [genreData, setGenreData] = React.useState<GenreDataType>();
  const [genreLoading, setGenreLoading] = React.useState<boolean>(false);
  const [genreError, setGenreError] = React.useState<boolean>(false);

  const sendGetGenreRequest = React.useCallback(async () => {
    setGenreLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL! + "/book/genre/",
      });

      setGenreData(response.data);
      setGenreLoading(false);
    } catch (error) {
      setGenreError(true);
      setGenreLoading(false);
    }
  }, []);

  return { genreData, genreLoading, genreError, sendGetGenreRequest };
};

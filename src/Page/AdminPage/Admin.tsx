import React from "react";
import { useSelector } from "react-redux";

import { BookDataType } from "../../redux/bookSlice";
import { LibraryHero } from "../LibraryPage/LibraryHero";
import { RootState } from "../../redux/redux";

import Box from "@mui/material/Box";

export const Admin = () => {
  const [searchedData, setSearchedData] = React.useState<string>("");
  const [displayData, setDisplayData] = React.useState<BookDataType[]>();

  const { books } = useSelector((state: RootState) => state.book);

  React.useEffect(() => {
    setDisplayData(books);
  }, [books]);

  // To search the books in every keystroke
  const passSearchedData = (inputData: string) => {
    setSearchedData(inputData);
  };

  const filteredData = books?.filter((item) =>
    item.name.toLowerCase().includes(searchedData.toLowerCase())
  );

  React.useEffect(() => {
    setDisplayData(filteredData);
  }, [filteredData]);
  return (
    <Box>
      <LibraryHero
        searchedData={searchedData}
        passSearchedData={passSearchedData}
      />
    </Box>
  );
};

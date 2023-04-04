import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/redux";
import { AdminBookCard } from "./AdminBookCard";
import { LibraryHero } from "../LibraryPage/LibraryHero";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdminTab } from "./AdminTab";

export const Admin = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");

  const { books } = useSelector((state: RootState) => state.book);

  // const filteredData = books?.filter((item) =>
  //   item.name.toLowerCase().includes(searchInput.toLowerCase())
  // );

  return (
    <React.Fragment>
      <LibraryHero
        searchedData={searchInput}
        passSearchedData={setSearchInput}
      />
      <Box sx={{ px: 4, my: 4 }}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          sx={{ mb: 4, fontSize: 26 }}
        >
          Library Administration
        </Typography>
      </Box>
      <AdminTab />
    </React.Fragment>
  );
};

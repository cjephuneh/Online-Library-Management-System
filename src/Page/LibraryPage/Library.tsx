import React from "react";
import { useSelector } from "react-redux";

import { BookCard } from "./BookCard";
import { LibraryHero } from "./LibraryHero";
import { RootState } from "../../redux/redux";
import { BooksSkeleton } from "../../component/Skeleton/BooksSkeleton";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { FormControl, InputLabel } from "@mui/material";

interface Props {
  bookLoading: boolean;
  bookError: boolean;
}

export const Library: React.FC<Props> = ({ bookLoading, bookError }) => {
  const [searchInput, setSearchInput] = React.useState<string>("");

  const { books } = useSelector((state: RootState) => state.book);

  const filteredData = books?.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <React.Fragment>
      <LibraryHero
        searchedData={searchInput}
        passSearchedData={setSearchInput}
      />
      <Box sx={{ px: 4, my: 4 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="body2"
            fontWeight={500}
            color="text.secondary"
            sx={{ mb: 4, fontSize: 26 }}
          >
            Recently Added
          </Typography>
          <FormControl sx={{ width: "30vw" }}>
            <InputLabel id="demo-simple-select-label">
              --- Select Genre ---
            </InputLabel>
            {/* <Select
              labelId="genre-select"
              id="genre-select"
              // value={genre}
              label="Select Genre"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </FormControl>
        </Stack>
        {bookLoading && <BooksSkeleton />}
        {!bookError && (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {filteredData?.map((item) => (
              <BookCard key={item.id} {...item} showReturn={false} />
            ))}
          </Stack>
        )}
        {bookError && (
          <Typography variant="h3" color="text.secondary" textAlign={"center"}>
            Book Fetching Request Failed!
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
};

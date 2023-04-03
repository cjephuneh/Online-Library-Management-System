import React from "react";

import { LibraryHero } from "./LibraryHero";
import { BookCard } from "./BookCard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BooksSkeleton } from "../../component/Skeleton/BooksSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/redux";

interface Props {
  bookLoading: boolean;
  bookError: boolean;
}

export const Library: React.FC<Props> = ({ bookLoading, bookError }) => {
  const { books } = useSelector((state: RootState) => state.book);

  return (
    <React.Fragment>
      <LibraryHero />
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
          <Typography>Genre</Typography>
        </Stack>
        {bookLoading && <BooksSkeleton />}
        {!bookError && (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {books?.map((item) => (
              <BookCard key={item.id} {...item} />
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

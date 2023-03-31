import React from "react";

import { LibraryHero } from "./LibraryHero";
import { BookCard } from "./BookCard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const Library = () => {
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

        <Stack
          direction={"row"}
          justifyContent={"center"}
          gap={4}
          flexWrap={"wrap"}
        >
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </Stack>
      </Box>
    </React.Fragment>
  );
};

import React from "react";

import { useGetBRBooks } from "./useGetBRBooks";
import { LibraryHero } from "../LibraryPage/LibraryHero";
import { useDecodedToken } from "../../hooks/useDecodedToken";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { DashboardBookCard } from "./DashboardBookCard";

export const Dashboard = () => {
  const [searchedData, setSearchedData] = React.useState<string>("");

  const { bookData, bookError, sendGetBookRequest } = useGetBRBooks();

  const { currentEmail } = useDecodedToken();

  React.useEffect(() => {
    sendGetBookRequest(currentEmail);
  }, [sendGetBookRequest, currentEmail, bookData]);

  const filteredData = bookData?.filter((item) =>
    item.name.toLowerCase().includes(searchedData.toLowerCase())
  );

  return (
    <Box>
      <LibraryHero
        searchedData={searchedData}
        passSearchedData={setSearchedData}
      />
      <Box sx={{ px: 4, my: 4 }}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.secondary"
          sx={{ mb: 4, fontSize: 26 }}
        >
          Your Borrowed/ Reserved Book
        </Typography>
        {!bookError && (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {filteredData?.map((item) => (
              <DashboardBookCard key={item.id} {...item} />
            ))}
            {filteredData?.length === 0 && (
              <Typography variant="h4" color={"text.secondary"}>
                No Books Found!
              </Typography>
            )}
          </Stack>
        )}
        {bookError && (
          <Typography variant="h3" color="text.secondary" textAlign={"center"}>
            Book Fetching Request Failed!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

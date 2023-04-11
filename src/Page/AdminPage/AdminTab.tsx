import React from "react";
import { useSelector } from "react-redux";

import { useGetGenre } from "./useGetGenre";
import { useGetAuthor } from "./useGetAuthor";
import { RootState } from "../../redux/redux";
import { AdminBookCard } from "./AdminBookCard";
import { AdminGenreCard } from "./AdminGenreCard";
import { AdminAuthorCard } from "./AdminAuthorCard";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";

export const AdminTab: React.FC = () => {
  // For Tab Selector
  const [value, setValue] = React.useState("1");

  const onTabChangeHandler = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue(newValue);
  };

  const { books } = useSelector((state: RootState) => state.book);

  // To get Genre Data
  const { genreData, genreError, sendGetGenreRequest } = useGetGenre();

  React.useEffect(() => {
    sendGetGenreRequest();
  }, [sendGetGenreRequest, genreData]);

  // To get Author Data
  const { authorData, authorError, sendGetAuthorRequest } = useGetAuthor();

  React.useEffect(() => {
    sendGetAuthorRequest();
  }, [sendGetAuthorRequest, authorData]);

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={onTabChangeHandler}
            variant="fullWidth"
            aria-label="Movie Tab"
          >
            <Tab label={"Book"} value={"1"} />
            <Tab label={"Author"} value={"2"} />
            <Tab label={"Genre"} value={"3"} />
          </TabList>
        </Box>

        <TabPanel value={"1"} sx={{ minHeight: "100vh" }}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {books?.map((item) => (
              <AdminBookCard key={item.id} {...item} />
            ))}
          </Stack>
        </TabPanel>
        <TabPanel value={"2"} sx={{ minHeight: "100vh" }}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {authorData?.map((item) => (
              <AdminAuthorCard key={item.id} {...item} />
            ))}
            {authorError && (
              <Typography variant="h4" color="text.secondary">
                Error while fetching author....
              </Typography>
            )}
          </Stack>
        </TabPanel>
        <TabPanel value={"3"} sx={{ minHeight: "100vh" }}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
          >
            {genreData?.map((item) => (
              <AdminGenreCard key={item.id} {...item} />
            ))}
            {genreError && (
              <Typography variant="h4" color="text.secondary">
                Error while fetching genre....
              </Typography>
            )}
          </Stack>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

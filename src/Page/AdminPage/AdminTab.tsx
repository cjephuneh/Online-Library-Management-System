import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/redux";
import { AdminBookCard } from "./AdminBookCard";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const AdminTab: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const onTabChangeHandler = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue(newValue);
  };

  const { books } = useSelector((state: RootState) => state.book);

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
          <Stack direction={"row"} gap={2}></Stack>
        </TabPanel>
        <TabPanel value={"3"} sx={{ minHeight: "100vh" }}>
          <Stack direction={"row"} gap={2}></Stack>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

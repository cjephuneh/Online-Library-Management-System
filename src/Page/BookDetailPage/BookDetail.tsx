import React from "react";

import { useBookBorrow } from "./useBookBorrow";
import { useBookReserve } from "./useBookReserve";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LoadingButton from "@mui/lab/LoadingButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubjectIcon from "@mui/icons-material/Subject";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BeenhereIcon from "@mui/icons-material/Beenhere";

export const BookDetail = () => {
  const { borrowLoading, sendBorrowRequest } = useBookBorrow();
  const { reserveLoading, sendReserveRequest } = useBookReserve();
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ pr: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          <Avatar
            alt="book"
            src="https://m.media-amazon.com/images/I/61dioN3IlcL._AC_UF894,1000_QL80_.jpg"
            sx={{
              height: { xs: 400, md: 600 },
              width: { xs: "90vw", md: 400 },
            }}
            variant="square"
          />
          <Stack justifyContent={"space-between"}>
            <Box>
              <Typography variant="h4" component="div" fontWeight={700}>
                The Idealist
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aaron Swartz (1986–2013) was an American computer programmer, a
                writer, a political organizer, and an Internet hacktivist,
                devoted to a free and open internet. He was involved in the
                development of RSS, Creative Commons, web.py, and Reddit. When
                he tried to 'liberate' data from an academic website, US
                authorities responded fiercely. He faced a fine of up to $1m and
                35 years in jail. In 2013, he tragically took his own life.{" "}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>Aaron Swartz</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText>2013-2015</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SubjectIcon />
                  </ListItemIcon>
                  <ListItemText>Biography</ListItemText>
                </ListItem>
                <ListItem sx={{ color: "#2e7d32" }}>
                  <ListItemIcon>
                    <LibraryBooksIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Available</ListItemText>
                </ListItem>
              </List>
            </Box>

            <Box>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                gap={4}
                sx={{ mb: 2 }}
              >
                <LoadingButton
                  variant="contained"
                  color="success"
                  loading={borrowLoading}
                  loadingPosition="start"
                  startIcon={<LocalMallIcon />}
                  onClick={() => sendBorrowRequest({ random: "" })}
                  fullWidth
                >
                  Borrow
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="warning"
                  loading={reserveLoading}
                  loadingPosition="start"
                  startIcon={<BeenhereIcon />}
                  onClick={() => sendReserveRequest({ random: "" })}
                  fullWidth
                >
                  Reserved
                </LoadingButton>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                *** Books can be borrowed for 21 days while it can be reserved
                only for 2 days. If its not picked up within 2 days, it will be
                back to available.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useBookBorrow } from "./useBookBorrow";
import { useBookReserve } from "./useBookReserve";
import { RootState } from "../../redux/redux";
import { useBookReturn } from "./useBookReturn";
import { useDecodedToken } from "../../hooks/useDecodedToken";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
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
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";

export const BookDetail = () => {
  const { bookID, bookSLUG } = useParams();

  const { borrowLoading, sendBorrowRequest } = useBookBorrow();
  const { reserveLoading, sendReserveRequest } = useBookReserve();
  const { returnLoading, sendReturnRequest } = useBookReturn();

  const { books } = useSelector((state: RootState) => state.book);

  const book = books?.find(
    (item) => item.id === +bookID! && item.slug === bookSLUG
  );

  const end_at = new Date(book?.end_at!).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // To check whether the book is borrowed by this user or not to render the button conditionally
  const { currentEmail } = useDecodedToken();

  // To check book availability
  const today = new Date().getTime();
  const endTimeStamp = new Date(book?.end_at!).getTime();
  const isBookAvailable = today - endTimeStamp > 86400000;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ pr: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          <Avatar
            alt="book"
            src={book?.photo}
            sx={{
              height: { xs: 400, md: 600 },
              width: { xs: "90vw", md: 400 },
            }}
            variant="square"
          />
          <Stack justifyContent={"space-between"}>
            <Box>
              <Typography variant="h4" component="div" fontWeight={700}>
                {book?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book?.summary}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>{book?.author}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText>{book?.releases_time}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SubjectIcon />
                  </ListItemIcon>
                  <ListItemText>{book?.genre}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ThumbsUpDownIcon />
                  </ListItemIcon>
                  <ListItemIcon>
                    <Rating
                      name="read-only"
                      value={+book?.rating!}
                      precision={0.5}
                      readOnly
                      sx={{ color: "#ed6c02" }}
                    />
                  </ListItemIcon>
                </ListItem>
                {isBookAvailable && (
                  <ListItem sx={{ color: "#2e7d32" }}>
                    <ListItemIcon>
                      <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText>Available</ListItemText>
                  </ListItem>
                )}
                {!isBookAvailable && (
                  <ListItem sx={{ color: "#d32f2f" }}>
                    <ListItemIcon>
                      <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText>Not Available Till {end_at}</ListItemText>
                  </ListItem>
                )}
              </List>
            </Box>

            <Box>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                gap={4}
                sx={{ mb: 2 }}
              >
                {currentEmail !== book?.patrons && (
                  <LoadingButton
                    variant="contained"
                    color="success"
                    loading={borrowLoading}
                    loadingPosition="start"
                    startIcon={<LocalMallIcon />}
                    onClick={() => sendBorrowRequest(bookID!, bookSLUG!)}
                    disabled={!isBookAvailable}
                    fullWidth
                  >
                    Borrow
                  </LoadingButton>
                )}
                {currentEmail !== book?.patrons && (
                  <LoadingButton
                    variant="contained"
                    color="warning"
                    loading={reserveLoading}
                    loadingPosition="start"
                    startIcon={<BeenhereIcon />}
                    onClick={() => sendReserveRequest(bookID!, bookSLUG!)}
                    disabled={!isBookAvailable}
                    fullWidth
                  >
                    Reserved
                  </LoadingButton>
                )}
              </Stack>
              {currentEmail === book?.patrons && (
                <LoadingButton
                  variant="contained"
                  color="success"
                  loading={returnLoading}
                  loadingPosition="start"
                  startIcon={<BeenhereIcon />}
                  onClick={() => sendReturnRequest(bookID!, bookSLUG!)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Return
                </LoadingButton>
              )}
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

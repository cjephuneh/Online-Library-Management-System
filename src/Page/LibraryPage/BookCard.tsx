import React from "react";
import { useNavigate } from "react-router-dom";

import { BookDataType } from "../../redux/bookSlice";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

interface Props extends BookDataType {
  showReturn: boolean;
}

export const BookCard: React.FC<Props> = ({ ...item }) => {
  const navigate = useNavigate();

  const end_at = new Date(item.end_at!).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const today = new Date().getTime();
  const endTimeStamp = new Date(item?.end_at!).getTime();
  const isBookAvailable = today - endTimeStamp > 86400000;

  return (
    <Card
      elevation={0}
      sx={{ minWidth: { xs: "95vw", md: 375 }, borderRadius: 2.5 }}
      onClick={() => navigate(`/library/${item?.id}/${item?.slug}/`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={item?.photo}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h6" component="div" fontWeight={700}>
            {item?.name.slice(0, 32)}...
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item?.author}
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mb: 2 }}
          >
            <Rating
              name="read-only"
              value={+item.rating}
              precision={0.5}
              readOnly
              sx={{ color: "#40c057" }}
            />
            <Typography variant="body2" color="text.secondary">
              {item.genre}
            </Typography>
          </Stack>

          {!item.showReturn && !isBookAvailable && (
            <Typography variant="body2" sx={{ color: "red" }}>
              Not Available Till {end_at}
            </Typography>
          )}

          {item.showReturn && (
            <Typography variant="body2" sx={{ color: "#ed6c02" }}>
              Return this book within {end_at}
            </Typography>
          )}

          {isBookAvailable && (
            <Typography variant="body2" sx={{ color: "green" }}>
              Available
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

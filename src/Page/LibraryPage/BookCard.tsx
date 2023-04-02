import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { BookDataType } from "../../redux/bookSlice";

export const BookCard: React.FC<BookDataType> = ({ ...item }) => {
  const navigate = useNavigate();

  const end_at = new Date(item.end_at!).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <Card
      elevation={0}
      sx={{ minWidth: { xs: "95vw", md: 375 }, borderRadius: 2.5 }}
      onClick={() => navigate(`/library/${item.id}/${item.slug}/`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={item.photo}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h6" component="div" fontWeight={700}>
            {item.name.slice(0, 32)}...
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.author}
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

          {item.end_at && (
            <Typography variant="body2" sx={{ color: "red" }}>
              Not Available Till {end_at}
            </Typography>
          )}

          {!item.end_at && (
            <Typography variant="body2" sx={{ color: "green" }}>
              Available
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

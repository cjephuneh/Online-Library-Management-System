import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const BookCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      elevation={0}
      sx={{ minWidth: { xs: "100vw", md: 375 }, borderRadius: 2.5 }}
      onClick={() => navigate("/library/1/aarow-swartz")}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="https://m.media-amazon.com/images/I/61dioN3IlcL._AC_UF894,1000_QL80_.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h6" component="div" fontWeight={700}>
            The Idealist
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Aaron Swartz
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mb: 2 }}
          >
            <Rating
              name="read-only"
              value={3.5}
              precision={0.5}
              readOnly
              sx={{ color: "#40c057" }}
            />
            <Typography variant="body2" color="text.secondary">
              Biography
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: "red" }}>
            Not Available for borrowing till 14th March
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

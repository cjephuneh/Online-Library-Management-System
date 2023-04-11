import React from "react";

import { GenreDataType } from "./useGetGenre";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const AdminGenreCard: React.FC<GenreDataType> = ({ ...item }) => {
  return (
    <Card sx={{ width: "100vw" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.about}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          variant="contained"
          color="warning"
          loadingPosition="start"
          startIcon={<EditIcon />}
          //   onClick={() => setEditModel(true)}
          sx={{ my: 0.5 }}
          fullWidth
        >
          Edit
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="error"
          loadingPosition="start"
          startIcon={<DeleteForeverIcon />}
          // onClick={() => sendBorrowRequest(bookID!, bookSLUG!)}
          sx={{ my: 0.5 }}
          fullWidth
        >
          Delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { AdminBookDataType, schema } from "./AdminBookZod";
import { AdminBookInputField } from "./AdminBookInput";
import { CustomInput } from "../../component/CustomInput/CustomInput";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { zodResolver } from "@hookform/resolvers/zod";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const AdminBookInputModel: React.FC<Props> = ({ open, handleClose }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      photo: "",
      summary: "",
      releases_time: "",
      rating: "",
    },
    resolver: zodResolver(schema),
  });

  const onBookFormSubmitHandler: SubmitHandler<AdminBookDataType> = (data) => {
    console.log(data);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Book
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: { xs: "95vw", md: 400 }, margin: "auto" }}>
        <FormProvider {...methods}>
          <Stack
            gap={2}
            component={"form"}
            noValidate
            onSubmit={methods.handleSubmit(onBookFormSubmitHandler)}
          >
            {AdminBookInputField.map((item) => (
              <CustomInput key={item.id} {...item} />
            ))}
            <Button
              variant="contained"
              color="warning"
              type={"submit"}
              startIcon={<LibraryAddIcon />}
              sx={{ borderRadius: 5, px: { xs: 2, md: 6 } }}
              autoFocus
            >
              Add Book
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

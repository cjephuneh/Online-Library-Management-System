import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { CustomInput } from "../../component/CustomInput/CustomInput";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";

import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../theme/useTheme";
import { useMediaQuery } from "@mui/material";

export const LibraryHero = () => {
  const methods = useForm({
    defaultValues: {
      searchInput: "",
    },
  });

  const onSearchFormSubmitHandler: SubmitHandler<{
    searchInput: string;
  }> = (data) => {
    console.log(data);
  };

  const { theme } = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box
      sx={{
        background:
          "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80)",
        minHeight: 300,
        py: 12,
        px: 2,
      }}
    >
      <FormProvider {...methods}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          component={"form"}
          noValidate
          onSubmit={methods.handleSubmit(onSearchFormSubmitHandler)}
        >
          <CustomInput
            id="searchInput"
            name="searchInput"
            label=""
            placeholder="Search on Library..."
            type="text"
            startIcon={<></>}
            endIcon={<></>}
            endIconSwap={<></>}
            required={true}
            hiddenLabel
            variant={"filled"}
            InputLabelProps={{ shrink: false }}
            size={smallScreen ? "small" : "medium"}
            sx={{
              background: "#fff",
              borderRadius: 2.5,
              width: { xs: "90vw", sm: "50vw" },
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={false}
            fullWidth={smallScreen ? true : false}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            size={smallScreen ? "small" : "large"}
            sx={{ fontWeight: 700, borderRadius: 2.5, py: { xs: 1, sm: 2 } }}
          >
            Search
          </LoadingButton>{" "}
        </Stack>
      </FormProvider>
    </Box>
  );
};

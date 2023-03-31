import { Stack } from "@mui/material";
import React from "react";
import SingleSkeleton from "./SingleSkeleton";

export const BooksSkeleton = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      gap={4}
      flexWrap={"wrap"}
    >
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </Stack>
  );
};

import React from "react";

import Skeleton from "@mui/material/Skeleton";

export default function SingleSkeleton() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900", borderRadius: 2.5 }}
      variant="rectangular"
      width={375}
      height={450}
    />
  );
}

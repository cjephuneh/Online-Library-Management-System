import React from "react";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <React.Fragment>
      <Divider />
      <Stack direction={"row"} justifyContent={"space-around"} sx={{ p: 4 }}>
        <Stack gap={2}>
          <Typography variant="body2" fontWeight={700}>
            <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
              Online Library &#169; 2023
            </Link>
          </Typography>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            Accessibility
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            Privacy Policy
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            Copyright Policy
          </Link>
        </Stack>
        <Stack gap={2}>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            About
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            User Agreement
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            Cookie Policy
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            Community Guidelines
          </Link>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

import { Box } from "@mui/material";
import * as React from "react";

export interface IAppProps {}

export default function Footer(props: IAppProps) {
  return (
    <Box component={"footer"} py={2} textAlign={"center"}>
      Footer
    </Box>
  );
}

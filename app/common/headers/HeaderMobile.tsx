import { Box } from "@mui/material";
import * as React from "react";

export interface IAppProps {}

export default function HeaderMobile(props: IAppProps) {
  return <Box display={{ xs: "block", md: "none" }}>Header Mobile</Box>;
}

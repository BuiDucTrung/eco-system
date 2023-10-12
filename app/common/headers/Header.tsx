import { Box, Stack } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

export interface IAppProps {}

export default function Header(props: IAppProps) {
  return (
    <Box component={"header"} py={2} textAlign={"center"}>
      <HeaderMobile />
      <HeaderDesktop />
    </Box>
  );
}

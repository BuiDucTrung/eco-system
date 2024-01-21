"use client";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import { ROUTE_LIST } from "../routes";
import { useAuth } from "@/app/hooks/use-auth";

export interface IAppProps {}

export default function Header(props: IAppProps) {
  const { profile } = useAuth();
  const isLoggedIn = Boolean(profile?.username);
  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || (route.requireLogin && isLoggedIn));
  return (
    <Box component={"header"} py={2} textAlign={{ xs: "left", md: "center" }} paddingY={{ xs: 0, md: "16px" }}>
      <HeaderMobile routeList={routeList} isLoggedIn={isLoggedIn} />
      <HeaderDesktop routeList={routeList} isLoggedIn={isLoggedIn} />
    </Box>
  );
}

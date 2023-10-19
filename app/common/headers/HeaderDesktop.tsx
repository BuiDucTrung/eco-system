"use client";
import { Box, Container, Stack, Link as MuiLink } from "@mui/material";
import * as React from "react";
import { ROUTE_LIST } from "../routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/app/hooks/use-auth";

export interface IAppProps {}

export default function HeaderDesktop(props: IAppProps) {
  const pathName = usePathname();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile?.username);

  const routeList = ROUTE_LIST.filter((route) => !route.requireLogin || (route.requireLogin && isLoggedIn));

  return (
    <Box display={{ xs: "none", md: "block" }} py={2}>
      <Container>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          {routeList.map((route) => (
            <MuiLink
              sx={{ ml: 2, fontWeight: "medium" }}
              key={route.path}
              href={route.path}
              component={Link}
              className={clsx({ active: pathName === route.path })}
            >
              {route.label}
            </MuiLink>
          ))}

          {!isLoggedIn && (
            <MuiLink sx={{ ml: 2, fontWeight: "medium" }} component={Link} href={"/login"}>
              Login
            </MuiLink>
          )}

          {isLoggedIn && (
            <MuiLink sx={{ ml: 2, fontWeight: "medium", cursor: "pointer" }} onClick={logout}>
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

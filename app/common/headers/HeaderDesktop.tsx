"use client";
import { Box, Container, Stack, Link as MuiLink } from "@mui/material";
import * as React from "react";
import { ROUTE_LIST } from "../routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export interface IAppProps {}

export default function HeaderDesktop(props: IAppProps) {
  const pathName = usePathname();

  return (
    <Box display={{ xs: "none", md: "block" }} py={2}>
      <Container>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          {ROUTE_LIST.map((route) => (
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
        </Stack>
      </Container>
    </Box>
  );
}

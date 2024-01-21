import { Box, Container, Stack, Link as MuiLink } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/use-auth";
import Drawer from "./Drawer";

export interface IAppProps {
  routeList: Array<{ label: string; path: string; requireLogin?: boolean }>;
  isLoggedIn: boolean;
}

export default function HeaderMobile({ routeList, isLoggedIn }: IAppProps) {
  const pathName = usePathname();
  const { logout } = useAuth();
  const contentHeader = () => {
    return (
      <Stack direction={"column"} justifyContent={"flex-start"} alignItems={"center"} gap={"10px"} pt={2} width={{ xs: "30vw", sm: "30vw" }}>
        {routeList.map((route) => (
          <MuiLink
            sx={{ ml: 1, fontWeight: "medium" }}
            key={route.path}
            href={route.path}
            component={Link}
            className={clsx({ active: pathName === route.path })}
          >
            {route.label}
          </MuiLink>
        ))}

        {!isLoggedIn && (
          <MuiLink sx={{ ml: 1, fontWeight: "medium" }} component={Link} href={"/login"}>
            Login
          </MuiLink>
        )}

        {isLoggedIn && (
          <MuiLink sx={{ ml: 1, fontWeight: "medium", cursor: "pointer" }} onClick={logout}>
            Logout
          </MuiLink>
        )}
      </Stack>
    );
  };

  return (
    <Box display={{ xs: "block", md: "none" }}>
      <Drawer contentHeader={contentHeader}></Drawer>
    </Box>
  );
}

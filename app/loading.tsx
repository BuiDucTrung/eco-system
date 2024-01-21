"use client";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box width={"100vw"} height={"100vh"} position={"fixed"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress color="secondary" />
    </Box>
  );
}

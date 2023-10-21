import { Box, Skeleton, Stack, Typography } from "@mui/material";
import * as React from "react";

export interface IWorkSkeletonProps {}

export default function WorkSkeleton(props: IWorkSkeletonProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box width={{ xs: "100%", md: "246px" }} flexShrink={0}>
        <Skeleton variant="rectangular" width={246} height={180} />
      </Box>

      <Box flexGrow={1}>
        <Typography variant="h4" fontWeight={"bold"}>
          <Skeleton />
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={3} mt={2} mb={3}>
          <Skeleton variant="rectangular" width={50} height={24} />
          <Typography ml={3} color={"GrayText"} flexGrow={1}>
            <Skeleton />
          </Typography>
        </Stack>
        <Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton width={"50%"} />
        </Typography>
      </Box>
    </Stack>
  );
}

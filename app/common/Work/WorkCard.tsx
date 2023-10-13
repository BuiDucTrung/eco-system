import { Work } from "@/app/models/work";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import * as React from "react";

export interface IWorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: IWorkCardProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box width={{ xs: "100%", md: "246px" }} flexShrink={0}>
        <Image src={work.thumbnailURL} width={246} height={180} layout="responsive" alt="thumbnail" />
      </Box>

      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          {work.title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={3} mt={2} mb={3}>
          <Chip label={format(+work.createdAt, "yyyy")} color="default" size="small" />
          <Typography color={"GrayText"}>{work.tagList.join(", ")}</Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  );
}

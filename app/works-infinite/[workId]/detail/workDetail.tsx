"use client";
import { useAuth } from "@/app/hooks/use-auth";
import { Work } from "@/app/models/work";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import * as React from "react";
import sanitize from "sanitize-html";

export interface IWorkDetailProps {
  work: Work;
}

export default function WorkDetail({ work }: IWorkDetailProps) {
  const { profile } = useAuth();
  const isLoggedIn = Boolean(profile?.username);
  const router = useRouter();
  return (
    <>
      <Stack mb={4} mt={8} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <Typography component={"h1"} variant="h3" fontWeight={"bold"}>
          {work.title}
        </Typography>

        {isLoggedIn && (
          <Button variant="contained" onClick={() => router.push(`/works-infinite/add`)}>
            Add new work
          </Button>
        )}
      </Stack>
      <Box>
        <Stack direction={"row"} alignItems={"center"} spacing={3} mt={2} mb={3}>
          <Chip label={format(+work.createdAt, "yyyy")} color="primary" size="small" />
          <Typography color={"GrayText"}>{work.tagList.join(", ")}</Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
      </Box>
      <Box
        sx={{ img: { maxWidth: "100%" } }}
        component={"div"}
        dangerouslySetInnerHTML={{ __html: sanitize(work.fullDescription, { allowedTags: sanitize.defaults.allowedTags.concat(["img"]) }) }}
      ></Box>
    </>
  );
}

import { Box, Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import PostCard from "./PostCard";
import { Post } from "@/app/models/post";

export interface IRecentPostProps {}

export default function RecentPosts(props: IRecentPostProps) {
  const postList: Post[] = [
    {
      id: 1,
      title: "Making a design system from scratch",
      slug: "",
      publishedDate: "2023-06-18T10:00:00Z",
      tagList: ["Design", "Pattern"],
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      id: 2,
      slug: "",
      title: "Creating pixel perfect icons in Figma",
      publishedDate: "2023-06-18T10:00:00Z",
      tagList: ["Figma", "Icon Design"],
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ];
  return (
    <Box component={"section"} bgcolor={"secondary.light"} pb={4} pt={2}>
      <Container>
        <Stack direction={"row"} mb={2} justifyContent={{ md: "space-between", xs: "center" }} alignItems={"center"}>
          <Typography variant="h5">Recent Post</Typography>
          <MuiLink component={Link} href={"/blog"} sx={{ display: { xs: "none", md: "inline" } }}>
            View all
          </MuiLink>
        </Stack>
        <Stack spacing={4} direction={{ xs: "column", md: "row" }} sx={{ "& > div": { width: { xs: "100%", md: "50%" } } }}>
          {postList.map((post) => (
            <Box key={post.id}>
              {" "}
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

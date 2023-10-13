import { Post } from "@/app/models/post";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import * as React from "react";

export interface IPostCardProps {
  post: Post;
}

export default function PostCard({ post }: IPostCardProps) {
  if (!post) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          {post.title}
        </Typography>
        <Typography component={"div"} variant="body1" my={2} display={"flex"} alignItems={"center"}>
          {format(+post.publishedDate, "dd MMM yyy")}
          {}
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          {post.tagList.join(", ")}
        </Typography>
        <Typography variant="body2">{post.description}</Typography>
        <Typography>Post title</Typography>
        <Typography>Post title</Typography>
        <Typography>Post title</Typography>
      </CardContent>
    </Card>
  );
}

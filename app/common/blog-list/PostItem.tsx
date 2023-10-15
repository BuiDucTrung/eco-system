import { Post } from "@/app/models/post";
import { Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import * as React from "react";

export interface IPostItemProps {
  post: Post;
}

export default function PostItem({ post }: IPostItemProps) {
  return (
    <div>
      <Typography variant="h5" fontWeight={"bold"}>
        {post.title}
      </Typography>
      <Typography component={"div"} variant="body1" my={2} display={"flex"} alignItems={"center"}>
        {format(new Date(post.publishedDate), "dd MMM yyy")}
        {}
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        {post.tagList.join(", ")}
      </Typography>
      <Typography variant="body2">{post.description}</Typography>
    </div>
  );
}

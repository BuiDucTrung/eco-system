import { Post } from "@/app/models/post";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import * as React from "react";
import PostItem from "../blog-list/PostItem";

export interface IPostCardProps {
  post: Post;
}

export default function PostCard({ post }: IPostCardProps) {
  if (!post) return null;
  return (
    <Card>
      <CardContent>
        <PostItem post={post} />
      </CardContent>
    </Card>
  );
}

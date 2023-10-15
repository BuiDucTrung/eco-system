import { Box, Container, Divider, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import PostItem from "../common/blog-list/PostItem";
import { getPostList } from "../utils/post";

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default async function App() {
  const postList = await getData();

  return (
    <Box>
      <Container>
        <h1>Blog</h1>
        <Box component={"ul"} sx={{ listStyleType: "none", p: 0 }}>
          {postList.map((post) => (
            <li key={post.id}>
              <MuiLink component={Link} href={`blog/${post.slug}`} sx={{ "&:hover": { color: "initial", textDecoration: "none" } }}>
                <PostItem post={post} />
              </MuiLink>
              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

async function getData() {
  // You would usually fetch data from an API here.
  // const res = await fetch("https://api.github.com/");

  // But, here we just wait for 3 seconds.

  const data = await getPostList();

  // You would usually return data from an API here.
  // return res.json();
  return data;
}

import { Post } from "@/app/models/post";
import { getPostList } from "@/app/utils/post";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import * as React from "react";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import { Metadata, ResolvingMetadata } from "next";

interface IBlogDetailProps {
  post: Post;
  params: { slug: string };
}
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const blogs = await getPostList();
  const blog = blogs.find((post) => post.slug === slug);

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: blog?.title,
  };
}

async function generateStaticParams() {
  const response = await getPostList();
  return response.map((link) => ({ paths: link.slug }));
}

async function getPostData(slug: string) {
  console.log("slug", slug);
  const response = await getPostList();
  const postData = response.find((post) => post.slug === slug);

  if (!postData) return;
  //convert marrkdown to html

  const file = await unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutoLinkHeadings, { behavior: "wrap" })
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(postData.mdContent || "");

  postData.htmlContent = file.toString();
  return postData;
}

export default async function BlogDetail({ post, params }: IBlogDetailProps) {
  const postData = await getPostData(params.slug);

  if (!postData) return notFound();

  return (
    <Container>
      <h1>BLOG DETAIL</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.htmlContent || "" }}></div>
    </Container>
  );
}

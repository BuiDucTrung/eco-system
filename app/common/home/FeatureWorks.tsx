import { Box, Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import PostCard from "./PostCard";
import { Post } from "@/app/models/post";
import { Work } from "@/app/models/work";
import WorkList from "../Work/WorkList";

export interface IFeatureWorksProps {}

export default function FeatureWorks(props: IFeatureWorksProps) {
  const workList: Work[] = [
    {
      id: "1",
      title: "Designing Dashboards",
      createdAt: "1697157356260",
      updatedAt: "1697157356260",
      tagList: ["Dashboard"],
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      fullDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      thumbnailUrl: "https://picsum.photos/246/180",
    },
    {
      id: "2",
      title: "Vibrant Portraits of 2020",
      createdAt: "1697157356260",
      updatedAt: "1697157356260",
      tagList: ["Illustration"],
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      fullDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      thumbnailUrl: "https://picsum.photos/246/180",
    },
    {
      id: "3",
      title: "Typography",
      createdAt: "1697157356260",
      updatedAt: "1697157356260",
      tagList: ["Figma", "Icon Design"],
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      fullDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      thumbnailUrl: "https://picsum.photos/246/180",
    },
  ];
  return (
    <Box component={"section"} pb={4} pt={2}>
      <Container>
        <Typography variant="h5" mb={4}>
          Feature works
        </Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  );
}

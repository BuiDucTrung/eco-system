import { Work } from "@/app/models/work";
import { Box, Divider } from "@mui/material";
import { Fragment } from "react";
import WorkCard from "./WorkCard";
import Image from "next/legacy/image";
import NoData from "@/public/images/no-data.jpg";
import WorkSkeleton from "./WorkSkeleton";

export interface IWorkListProps {
  workList: Work[];
  isLoading?: boolean;
}

export default function WorkList({ workList, isLoading = false }: IWorkListProps) {
  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={`${index}-skeleton`}>
            <WorkSkeleton />
            <Divider sx={{ mt: 2, mb: 4 }} />
          </Fragment>
        ))}
      </Box>
    );
  }

  if (!workList.length)
    return (
      <Box>
        <Image src={NoData} width={80} height={110} layout="responsive" alt="work thumbnail" priority />
      </Box>
    );
  return (
    <Box>
      {workList.map((work, index) => (
        <Box key={work.id} className={`${index % 2 === 0 ? "wordCardEven" : "workCardOdd"}`}>
          <WorkCard work={work} />
          <Divider sx={{ mt: 2, mb: 4 }} />
        </Box>
      ))}
    </Box>
  );
}

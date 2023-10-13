import { Work } from "@/app/models/work";
import { Box, Divider } from "@mui/material";
import { Fragment } from "react";
import WorkCard from "./WorkCard";

export interface IWorkListProps {
  workList: Work[];
}

export default function WorkList({ workList }: IWorkListProps) {
  if (!workList.length) return null;
  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />
          <Divider sx={{ mt: 2, mb: 4 }} />
        </Fragment>
      ))}
    </Box>
  );
}

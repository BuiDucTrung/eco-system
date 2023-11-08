"use client";

import WorkForm from "@/app/common/Work/WorkForm";
import useWorkDetail from "@/app/hooks/use-work-detail";
import { Work, WorkPayload } from "@/app/models/work";
import { Box, Button, Container, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";

export interface IAddEditWorkPageProps {}
export interface IAddSlugWorkPageProps {
  workId: string;
}

export default function AddEditWorkPage(props: IAddEditWorkPageProps) {
  const params = useParams();
  const route = useRouter();
  const isAddMode = params?.workId === "add";

  const { data: workDetail, isLoading } = useWorkDetail({ workId: params?.workId.toString(), enabled: !isAddMode });

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={"h1"} variant="h3">
            {isAddMode ? "Add new work" : `Edit work ${params.workId}`}
          </Typography>
        </Box>
        <Box>{(isAddMode || workDetail) && <WorkForm defaultValue={workDetail as any} onSubmit={() => {}} />}</Box>
      </Container>
    </Box>
  );
}

"use client";

import WorkForm from "@/app/common/Work/WorkForm";
import { useAddWork } from "@/app/hooks/use-work-add";

import useWorkDetail from "@/app/hooks/use-work-detail";
import { getErrorMessage } from "@/app/utils/getErrorMessage";
import revalWorkDetail from "@/app/utils/revalidateTag";
import { Box, Container, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { toast } from "react-toastify";

export interface IAddEditWorkPageProps {}
export interface IAddSlugWorkPageProps {
  workId: string;
}

export default function AddEditWorkPage(props: IAddEditWorkPageProps) {
  const params = useParams();
  const route = useRouter();
  const isAddMode = params?.workId === "add";
  const {
    swrResponse: { data: workDetail, isLoading },
    updateWork,
  } = useWorkDetail({ workId: params?.workId.toString(), enabled: !isAddMode });

  const addNewWork = useAddWork();

  const handleSubmitForm = async (payload: FormData) => {
    try {
      if (!isAddMode) {
        await updateWork(payload);
        toast.success("update successfully");
      } else {
        await addNewWork(payload);
        toast.success("add successfully");
      }

      route.push(`/works-infinite/${workDetail?.id}/detail`);
    } catch (error) {
      const message = getErrorMessage(error);
      console.log("error", error);
      toast.error(message);
    }
  };

  return (
    <Box>
      <Container>
        <Box mb={4} mt={{ xs: 4, md: 8 }}>
          <Typography component={"h1"} variant="h3">
            {isAddMode ? "Add new work" : `Edit work ${params.workId}`}
          </Typography>
        </Box>
        <Box>{(isAddMode || workDetail) && <WorkForm defaultValue={workDetail as any} onSubmit={handleSubmitForm} />}</Box>
      </Container>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" strategy="afterInteractive"></Script>
    </Box>
  );
}

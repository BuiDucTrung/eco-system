"use client";
import useWorkDetail from "@/app/hooks/use-work-detail";
import { Box, Container } from "@mui/material";
import { useParams } from "next/navigation";
import WorkDetail from "./workDetail";

// export async function generateStaticParams() {
//   const response = await workApi.getAll({_page: 1, _limit:3});
//   const data = await response.json();
//   data?.data.map((work: any) => {
//     console.log(String(work.id));
//   });
//   return data?.data.map((work: Work) => ({ workId: String(work.id) }));
// }

// async function getWorkData(workId: string) {
//   const response = await fetch(`https://js-post-api.herokuapp.com/api/works/${workId}`, { next: { revalidate: 300, tags: ["work-detail"] } }); //300s
//   const data = await response.json();
//   return data;
// }

export default function WorkDetailsPage() {
  const params = useParams();

  const {
    swrResponse: { data: workDetail, isLoading },
  } = useWorkDetail({ workId: params?.workId.toString() });

  if (!workDetail) {
    return <>No Data</>;
  }
  return (
    <Box>
      <Container>
        <WorkDetail work={workDetail} />
      </Container>
    </Box>
  );
}

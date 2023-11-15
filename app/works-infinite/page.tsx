"use client";
import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useInView } from "react-intersection-observer";
import WorkFilter from "../common/Work/WorkFilter";
import WorkList from "../common/Work/WorkList";
import useWorkListInfinity from "../hooks/use-work-list-infinity";
import { ListResponse } from "../models/api";
import { Work, WorkFilterPayload } from "../models/work";
import { Arguments, useSWRConfig } from "swr";

export default function WorksPage(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const convertDefaultValue = () => {
    const valueParams = queryString.parse(params.toString());
    const valueConverted = { ...valueParams, selectedTagList: valueParams["tagList_like"] ? valueParams["tagList_like"].toString().split("|") : [] };
    return valueConverted;
  };

  const { data, isLoading, size, setSize, isValidating } = useWorkListInfinity({ params: { ...queryString.parse(params.toString()) } });

  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data);
      return result;
    }, []) || [];

  const totalRows = data?.[0]?.pagination._totalRows || 0;
  const showLoadmore = totalRows > workList.length;

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView) setSize(size + 1);
    },
  });

  function handleFiltersChange(newFilters: WorkFilterPayload) {
    params.set("tagList_like", newFilters.selectedTagList?.join("|") || "");
    params.set("title_like", newFilters.title_like);

    router.push(`${pathname}${params.toString() ? "?" + params.toString() : ""}`);
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={"h1"} variant="h3" fontWeight={"bold"}>
            Work
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => router.push("/works-infinite/add")}>
          Go to add work page
        </Button>
        <WorkFilter onSubmit={handleFiltersChange} defaultValue={convertDefaultValue()} />
        <WorkList workList={workList} isLoading={isLoading} />
        {showLoadmore && (
          <Stack justifyContent={"center"} direction={"row"} sx={{ width: "100%" }} ref={ref}>
            <CircularProgress size={24} />
          </Stack>
        )}
      </Container>
    </Box>
  );
}

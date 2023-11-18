"use client";
import { Box, Button, Container, Pagination, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ChangeEvent } from "react";
import WorkFilter from "../common/Work/WorkFilter";
import WorkList from "../common/Work/WorkList";
import useWorkList from "../hooks/use-work-list";
import { WorkFilterPayload } from "../models/work";

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

  const { data: workList, isLoading } = useWorkList({ params: { _page: 1, _limit: 3, ...queryString.parse(params.toString()) } });

  const { _limit, _totalRows } = workList?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePreClick = () => {
    params.set("_page", ((Number(params.get("_page")) ?? 1) - 1).toString());
    router.push(`${pathname}${params.toString() ? "?" + params.toString() : ""}`);
  };

  const handleNextClick = () => {
    params.set("_page", ((Number(params.get("_page")) ?? 1) + 1).toString());

    router.push(`${pathname}${params.toString() ? "?" + params.toString() : ""}`);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    params.set("_page", value.toString());
    router.push(`${pathname}${params.toString() ? "?" + params.toString() : ""}`);
  };

  function handleFiltersChange(newFilters: WorkFilterPayload) {
    params.set("_page", "1");
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
        <WorkFilter onSubmit={handleFiltersChange} defaultValue={convertDefaultValue()} />
        <WorkList workList={workList?.data || []} isLoading={isLoading} />

        {!isLoading && totalPages > 1 && (
          <>
            <Stack alignItems={"center"}>
              <Pagination count={totalPages} page={Number(params.get("_page") ?? 1)} onChange={handlePageChange}></Pagination>
            </Stack>
            <Box>
              <Button variant="contained" onClick={handlePreClick}>
                Previous page
              </Button>

              <Button variant="contained" onClick={handleNextClick}>
                Next page
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

"use client";
import { Box, Button, Container, Pagination, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import WorkFilter from "../common/Work/WorkFilter";
import WorkList from "../common/Work/WorkList";
import useWorkList from "../hooks/use-work-list";
import { ListParams } from "../models/api";
import { WorkFilterPayload } from "../models/work";
import { useEffect } from "react";
export interface IAppProps {
  searchParams: { [key: string]: string };
}

export default function WorksPage(props: IAppProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const filters: Partial<ListParams> = { _page: 1, _limit: 3, ...props.searchParams };

  const { data: workList, isLoading } = useWorkList({ params: { ...filters } });

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
    for (const param in newFilters) {
      newFilters[param as keyof typeof newFilters] ? params.set(param, newFilters[param as keyof typeof newFilters]?.toString() || "") : params.delete(param);
    }
    params.set("_page", "1");
    router.push(`${pathname}${params.toString() ? "?" + params.toString() : ""}`);
    console.log("workList", workList);
    console.log("params", params.toString());
    console.log("props.searchParams", props.searchParams);
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component={"h1"} variant="h3" fontWeight={"bold"}>
            Work
          </Typography>
        </Box>
        <WorkFilter onSubmit={handleFiltersChange} defaultValue={props.searchParams} />
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

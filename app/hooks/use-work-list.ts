import useSWR from "swr";
import { SWRConfiguration } from "swr/_internal";
import * as React from "react";
import { ListParams } from "../models/api";
import { workApi } from "../api-client/work-api";
import { QuerryKeys } from "../common/constants/QueryKeys";

export interface IUseWorkListProps {
  params: Partial<ListParams>;
  options?: SWRConfiguration;
}

export default function useWorkList({ params, options }: IUseWorkListProps) {
  const swrResponse = useSWR([QuerryKeys.GET_WORK_LIST, params], () => workApi.getAll(params), {
    dedupingInterval: 30 * 1000,
    keepPreviousData: true,
    fallbackData: {
      _data: [],
      _pagination: {
        _page: 1,
        _limit: 10,
        _totalRows: 0,
      },
    },
    ...options,
  });
  return swrResponse;
}

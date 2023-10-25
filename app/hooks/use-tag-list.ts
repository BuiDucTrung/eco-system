import useSWR from "swr";
import { SWRConfiguration } from "swr/_internal";
import * as React from "react";
import { ListParams } from "../models/api";
import { workApi } from "../api-client/work-api";
import { QuerryKeys } from "../common/constants/QueryKeys";
import { tagsApi } from "../api-client/tags-api";

export interface IUseWorkListProps {
  params?: Partial<ListParams>;
  options?: SWRConfiguration;
}

export default function useTagList({ params = { _page: 1, _limit: 30 }, options }: IUseWorkListProps) {
  const swrResponse = useSWR(
    [QuerryKeys.GET_TAG_LIST, params],
    () => {
      return tagsApi.getAll(params);
    },
    {
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
    }
  );
  return swrResponse;
}

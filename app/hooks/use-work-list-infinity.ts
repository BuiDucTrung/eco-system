import useSWR from "swr";
import * as React from "react";
import { ListParams, ListResponse } from "../models/api";
import { workApi } from "../api-client/work-api";
import { QuerryKeys } from "../common/constants/QueryKeys";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import axiosClient from "../api-client/axios-client";
import { Work } from "../models/work";
import queryString from "query-string";
export interface IUseWorkListInfinityProps {
  params: Partial<ListParams>;
  options?: SWRInfiniteConfiguration;
}

export default function useWorkListInfinity({ params, options }: IUseWorkListInfinityProps) {
  const workList = useSWRInfinite<ListResponse<Work>>(
    (indexPage: number, previousDataPage: ListResponse<Work>) => {
      const page = indexPage + 1;
      if (previousDataPage) {
        const { _limit, _totalRows } = previousDataPage.pagination || { _limit: 5, _totalRows: 10 };
        const totalPage = Math.ceil(_totalRows / _limit);
        if (totalPage < page) return null;
      }
      const query: Partial<ListParams> = {
        _page: page,
        _limit: 5,
        ...params,
      };

      return `/works?${queryString.stringify(query)}`;
    },
    (url) => {
      return axiosClient.get(url);
    }
  );

  return workList;
}

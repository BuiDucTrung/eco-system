import useSWR from "swr";
import { SWRConfiguration } from "swr/_internal";
import * as React from "react";
import { ListParams } from "../models/api";
import { workApi } from "../api-client/work-api";
import { QuerryKeys } from "../common/constants/QueryKeys";
import revalWorkDetail from "../utils/revalidateTag";

export interface IUseWorkProps {
  workId: string;
  enabled?: boolean;
  options?: SWRConfiguration;
}

export default function useWorkDetail({ workId, enabled = true, options }: IUseWorkProps) {
  const swrResponse = useSWR(
    enabled ? [QuerryKeys.GET_TAG_WORK, workId] : null,
    () => {
      return workApi.get(workId);
    },
    {
      dedupingInterval: 30 * 1000,
      keepPreviousData: true,
      // fallbackData: {
      //   _data: [],
      // },
      ...options,
    }
  );

  const updateWork = async (payload: FormData) => {
    const newWork = await workApi.update(payload);
    swrResponse.mutate(newWork);
  };
  return { swrResponse, updateWork };
}

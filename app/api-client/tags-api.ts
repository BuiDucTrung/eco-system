import { ListParams, ListResponse } from "../models/api";

import axiosClient from "./axios-client";

export const tagsApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<string>> {
    return axiosClient.get("/tags", { params });
  },
};

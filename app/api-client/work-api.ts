import { ListResponse, ListParams } from "./../models/api";
import { LoginPayload } from "../models/auth-api";

import axiosClient from "./axios-client";
import { Work } from "../models/work";

export const workApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
    return axiosClient.get("/works", { params });
  },

  get(id: string) {
    return axiosClient.get(`/works/${id}`);
  },
};

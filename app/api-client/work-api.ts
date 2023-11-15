import { ListResponse, ListParams } from "./../models/api";
import { LoginPayload } from "../models/auth-api";

import axiosClient from "./axios-client";
import { Work } from "../models/work";

export const workApi = {
  getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
    return axiosClient.get("/works", { params });
  },

  get(id: string): Promise<Work> {
    return axiosClient.get(`/works/${id}`);
  },

  add(payload: FormData): Promise<Work> {
    return axiosClient.post(`/works`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update(payload: FormData): Promise<Work> {
    return axiosClient.patch(`/works/${payload.get("id")}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

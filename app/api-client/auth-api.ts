import { LoginPayload } from "../models/auth-api";

import axiosClient from "./axios-client";

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/login", payload);
  },

  getProfile() {
    return axiosClient.get("/profile");
  },
};

"use client";

import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { authApi } from "../api-client/auth-api";
import axiosClient from "../api-client/axios-client";
import { setAuthApi } from "../common/client-api";

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryInterval: 10,
    errorRetryCount: 2,
    ...options,
  });

  async function login() {
    const res: any = await authApi.login({
      username: "qwerrt",
      password: "dsadsadsdsadas",
    });
    setAuthApi(axiosClient, res.accessToken);
    localStorage.setItem("accessToken", res.accessToken);

    await mutate();
  }

  async function logout() {
    await authApi.logout();
    localStorage.removeItem("accessToken");
    mutate({}, false);
  }

  return {
    login,
    logout,
    profile,
  };
}

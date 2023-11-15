"use client";

import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { authApi } from "../api-client/auth-api";
import axiosClient from "../api-client/axios-client";
import { setAuthApi } from "../common/client-api";
import { LoginPayload } from "../models/login";
import { StorageKeys } from "../common/constants/StorageKeys";
import { ROUTE_LIST } from "../common/routes";
import { usePathname, useRouter } from "next/navigation";

export function useAuth(options?: Partial<PublicConfiguration>) {
  const path = usePathname();
  const router = useRouter();
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

  async function login(payload: LoginPayload) {
    const res: any = await authApi.login(payload);
    setAuthApi(axiosClient, res.accessToken);
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, res.accessToken);

    await mutate();
  }

  async function logout() {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    mutate(null, false);
    if (!localStorage.getItem("accessToken")) {
      const isNeedValidate = ROUTE_LIST.some((route) => path.includes(route.path) && route.requireLogin);
      isNeedValidate && router.push("/login");
    }
  }

  return {
    login,
    logout,
    profile,
  };
}

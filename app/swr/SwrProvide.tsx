"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SWRConfig, preload } from "swr";
import axiosClient from "../api-client/axios-client";
import { setAuthApi } from "../common/client-api";
import { ROUTE_LIST } from "../common/routes";
import { encodeUrl } from "../utils/url";

preload("/api/user", () => {
  if (typeof window !== "undefined") {
    localStorage.getItem("accessToken") && setAuthApi(axiosClient, localStorage.getItem("accessToken"));
  }
});

export const SWRProvider = ({ children }: any) => {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      const isNeedValidate = ROUTE_LIST.some((route) => path.includes(route.path) && route.requireLogin);
      isNeedValidate && router.push(`/login?back_to=${encodeUrl(window.location.pathname + window.location.search)}`);
    }
  }, [path]);
  // useEffect(() => {
  //   localStorage.getItem("accessToken") && setAuthApi(axiosClient, localStorage.getItem("accessToken"));
  // }, []);
  return <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>{children}</SWRConfig>;
};

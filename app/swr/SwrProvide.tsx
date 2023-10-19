"use client";
import { SWRConfig, preload } from "swr";
import axiosClient from "../api-client/axios-client";
import { setAuthApi } from "../common/client-api";
import { useEffect } from "react";

preload("/api/user", () => {
  if (typeof window !== "undefined") {
    localStorage.getItem("accessToken") && setAuthApi(axiosClient, localStorage.getItem("accessToken"));
  }
});

export const SWRProvider = ({ children }: any) => {
  // useEffect(() => {
  //   localStorage.getItem("accessToken") && setAuthApi(axiosClient, localStorage.getItem("accessToken"));
  // }, []);
  return <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>{children}</SWRConfig>;
};

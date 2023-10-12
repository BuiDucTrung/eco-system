"use client";
import { SWRConfig } from "swr";
import axiosClient from "../api-client/axios-client";
import { setAuthApi } from "../common/client-api";
import { useEffect } from "react";

export const SWRProvider = ({ children }: any) => {
  useEffect(() => {
    localStorage.getItem("accessToken") && setAuthApi(axiosClient, localStorage.getItem("accessToken"));
  }, []);
  return <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>{children}</SWRConfig>;
};

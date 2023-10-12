import { AxiosInstance } from "axios";

const setAuthApi = (axiosClient: AxiosInstance, token: string | null) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const deleteAuthApi = (axiosClient: AxiosInstance) => {
  axiosClient.defaults.headers.common["Authorization"] = ``;
};

export { setAuthApi, deleteAuthApi };

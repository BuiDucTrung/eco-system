import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { workApi } from "../api-client/work-api";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useAddWork() {
  const { mutate, cache } = useSWRConfig();
  async function addNewWork(payload: FormData) {
    //call API

    try {
      const newWork = await workApi.add(payload);

      for (const key of cache.keys() as any) {
        if (key.includes("/works")) {
          mutate(key, undefined, { revalidate: true });
        }
      }
      return newWork;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  }

  return addNewWork;
}

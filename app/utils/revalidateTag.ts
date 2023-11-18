"use server";

import { revalidateTag } from "next/cache";

export default async function revalWorkDetail() {
  revalidateTag("work-detail");
}

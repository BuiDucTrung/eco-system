import { Work } from "@/app/models/work";

export interface WorkDetailPageProps {
  params: { workId: string };
}

export async function generateStaticParams() {
  const response = await fetch(`https://js-post-api.herokuapp.com/api/works?_page=1&_limit=3`);
  const data = await response.json();
  data?.data.map((work: any) => {
    console.log(String(work.id));
  });
  return data?.data.map((work: Work) => ({ workId: String(work.id) }));
}
async function getWorkData(workId: string) {
  const response = await fetch(`https://js-post-api.herokuapp.com/api/works/${workId}`, { next: { revalidate: 300, tags: ["work-detail"] } }); //300s
  const data = await response.json();
  return data;
}

export default async function WorkDetailsPage({ params }: { params: { workId: string } }) {
  const { workId } = params;
  console.log("params", params);
  console.log("workId", workId);
  const work = await getWorkData(workId || "");
  if (!work) {
    return <>No Data</>;
  }
  return <>Data fetched</>;
}

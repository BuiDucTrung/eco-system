import { Typography } from "@mui/material";
import * as React from "react";

export interface IAppProps {
  posts: any[];
}

export default async function App(props: IAppProps) {
  const name = await getData();

  return (
    <div>
      <Typography component={"h1"} variant="h3" color={"primary.main"} fontFamily={""}>
        Blog page {name}
      </Typography>
    </div>
  );
}

async function getData() {
  // You would usually fetch data from an API here.
  // const res = await fetch("https://api.github.com/");

  // But, here we just wait for 3 seconds.
  await new Promise((res) => setTimeout(res, 3000));

  // You would usually return data from an API here.
  // return res.json();
  return "Dashboard data";
}

import React from "react";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";
import Terms_And_Privacy from "./Terms_And_Privacy";
import type { Route } from "../+types/Public_Route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy" },
    {
      name: "description",
      content: "Read our privacy policy regarding data usage.",
    },
  ];
}
export async function clientLoader() {
  const response = await axiosInstance.get(API.cms.privacy);
  return { data: response.data };
}
const Privacy = ({ loaderData }: Route.ComponentProps) => {
  const { data } = loaderData;
  console.log(data);
  return (
    <>
      <Terms_And_Privacy data={data} />
    </>
  );
};

export default Privacy;

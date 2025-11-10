import React from "react";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";
import type { Route } from "../+types/Public_Route";
import Terms_And_Privacy from "./Terms_And_Privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms & Conditions" },
    {
      name: "description",
      content: "Read the terms and conditions of our platform.",
    },
  ];
}

export async function clientLoader() {
  const response = await axiosInstance.get(API.cms.terms);
  return { data: response.data };
}
const Terms = ({ loaderData }: Route.ComponentProps) => {
  const { data } = loaderData;

  return (
    <>
      <Terms_And_Privacy data={data} />
    </>
  );
};

export default Terms;

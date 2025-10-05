import React from "react";
import Activate_Account from "./Activate_Account";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify account" },
    { name: "description", content: "Welcome to Ecommerce!" },
  ];
}
export async function clientLoader({ params }: Route.LoaderArgs) {
  const { email } = params;

  return { email };
}
const OTP = ({ loaderData }: Route.ComponentProps) => {
  return <Activate_Account loaderData={loaderData} />;
};

export default OTP;

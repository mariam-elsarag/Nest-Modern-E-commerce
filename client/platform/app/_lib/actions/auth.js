"use server";

import { API } from "@/app/_service/apiUrl";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  redirect(`${process.env.API_URL}${API.auth.google}`);
}

export async function login(body) {
  try {
    const url = `${process.env.API_URL}${API.auth.login}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res?.ok) {
      return { success: res.ok, message: data };
    }
    return {
      success: res.ok,
      data,
    };
  } catch (error) {
    console.log("catch", error);

    return {
      success: false,
      error,
    };
  }
}

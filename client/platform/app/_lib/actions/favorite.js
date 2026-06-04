"use server";

import { API } from "@/app/_constants/api";

export async function toggleFavorite(variantId) {
  try {
    const response = await fetch(
      `${process.env.API_URL}${API.favorite}/${variantId}`,
      {
        method: "PATCH",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.message || "Something went wrong",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: err?.message || "Network error",
    };
  }
}

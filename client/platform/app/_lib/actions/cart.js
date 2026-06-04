"use server";

import { cookies } from "next/headers";
import { API } from "@/app/_constants/api";

export async function addToCart({ variantId, quantity = 1, token }) {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get("cartToken")?.value;
  const url = `${process.env.API_URL}${API.cart}`;
  const body = {
    variant: variantId,
    quantity,
  };

  if (!token) {
    body.cartToken = cartToken;
  }
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return {
      success: true,
      data: await response.json(),
    };
  } catch {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function removeFromCart({ cartItemId, token }) {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get("cartToken")?.value;

  const url = new URL(`${process.env.API_URL}${API.cart}/${cartItemId}`);

  if (!token && cartToken) {
    url.searchParams.append("cartToken", cartToken);
  }

  try {
    const response = await fetch(url.toString(), {
      method: "DELETE",
    });
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }

  return true;
}

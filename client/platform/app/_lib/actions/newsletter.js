"use server";

export async function subscribeNewsletter(formData) {
  const email = formData.get("email");

  // save to DB or call API
  console.log(email);
}

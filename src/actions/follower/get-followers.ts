"use server";

import axios from "axios";

export async function getFollowers() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/followers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch followers");
    }
    throw new Error("Failed to fetch followers");
  }
}

"use server";

import axios from "axios";

export async function getProfits() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profits`);
    return res.data;
  } catch (error) {
    console.error("Error fetching profits:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch profits");
    }
    throw new Error("Failed to fetch profits");
  }
}

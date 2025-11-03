"use server";

import axios from "axios";

export async function getTours() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch listings");
    }
    throw new Error("Failed to fetch listings");
  }
}

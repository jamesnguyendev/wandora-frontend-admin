"use server";

import axios from "axios";

export async function getUsers() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch users");
    }
    throw new Error("Failed to fetch users");
  }
}

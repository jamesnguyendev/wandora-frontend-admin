"use server";

import axios from "axios";

import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

export async function getBookings() {
  const accessToken = await getValidAccessToken();

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to fetch getBookings");
    }
    throw new Error("Failed to fetch getBookings");
  }
}

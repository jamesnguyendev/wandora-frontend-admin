"use server";

import axios from "axios";

import { booking } from "@/types/booking";
import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

export const updateBooking = async (payload: Partial<booking>) => {
  const accessToken = await getValidAccessToken();

  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error update booking:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update booking");
    }
    throw new Error("Failed to update booking");
  }
};

"use server";

import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function getBookings() {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const accessToken = session.user.accessToken;

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

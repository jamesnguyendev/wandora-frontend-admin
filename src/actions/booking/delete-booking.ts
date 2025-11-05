"use server";

import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export const DeleteBooking = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const accessToken = session.user.accessToken;

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error delete Booking:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete Booking");
    }
    throw new Error("Failed to delete Booking");
  }
};

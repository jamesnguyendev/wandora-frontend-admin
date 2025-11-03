"use server";

import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export const DeleteTour = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const accessToken = session.user.accessToken;

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.error("res delete tour:", res);
  } catch (error) {
    console.error("Error delete tour:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete tour");
    }
    throw new Error("Failed to delete tour");
  }
};

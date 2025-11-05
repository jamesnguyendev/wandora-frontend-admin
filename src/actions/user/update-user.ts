"use server";

import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { UpdateUser } from "@/types";

export const updateUser = async (payload: UpdateUser) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  const accessToken = session.user.accessToken;

  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error update user:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update user");
    }
    throw new Error("Failed to update user");
  }
};

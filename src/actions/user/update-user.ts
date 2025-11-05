"use server";

import axios from "axios";

import { UpdateUser } from "@/types";
import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

export const updateUser = async (payload: UpdateUser) => {
  const accessToken = await getValidAccessToken();

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

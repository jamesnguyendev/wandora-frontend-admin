"use server";

import axios from "axios";

import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

export const DeleteUser = async (id: string) => {
  const accessToken = await getValidAccessToken();

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error delete user:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete user");
    }
    throw new Error("Failed to delete user");
  }
};

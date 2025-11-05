"use server";

import axios from "axios";

import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

import { FRONTEND_KEY } from "./add-tour";

export const DeleteTour = async (id: string) => {
  const accessToken = await getValidAccessToken();

  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-frontend-key": FRONTEND_KEY,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete tour");
    }
    throw new Error("Failed to delete tour");
  }
};

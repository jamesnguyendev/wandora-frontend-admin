import axios from "axios";

import { CreateTour } from "@/types";
import { getValidAccessToken } from "@/utils/auth/get-valid-access-token";

export const FRONTEND_KEY = process.env.NEXT_PUBLIC_FE_SECRET!;

export const addTour = async (payload: CreateTour) => {
  const accessToken = await getValidAccessToken();

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-frontend-key": FRONTEND_KEY,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding tour:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to add tour");
    }
    throw new Error("Failed to add tour");
  }
};

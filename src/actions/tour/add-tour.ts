import axios from "axios";

import { CreateTour } from "@/types";

export const addTour = async (payload: CreateTour, accessToken: string) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

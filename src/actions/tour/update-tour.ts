"use server";

import axios from "axios";

import { tour } from "@/types";

export const updateTour = async (payload: tour, accessToken: string) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/listings/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update tour");
    }
    throw new Error("Failed to update tour");
  }
};

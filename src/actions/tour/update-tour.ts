"use server";

import axios from "axios";

import { tour } from "@/types";

import { FRONTEND_KEY } from "./add-tour";

export const updateTour = async (payload: tour, accessToken: string) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/listings/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-frontend-key": FRONTEND_KEY,
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

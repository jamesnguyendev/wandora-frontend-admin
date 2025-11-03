"use server";

import axios from "axios";

import { AddMasterPayload } from "./add-profit";

export const updateProfit = async (payload: AddMasterPayload) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profits`, payload);
    return res.data;
  } catch (error) {
    console.error("Error update profits:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update profits");
    }
    throw new Error("Failed to update profits");
  }
};

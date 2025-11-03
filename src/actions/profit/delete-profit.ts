"use server";

import axios from "axios";

export const DeleteProfit = async (id: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/profits`, { data: { id } });
  } catch (error) {
    console.error("Error delete profits:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete profits");
    }
    throw new Error("Failed to delete profits");
  }
};

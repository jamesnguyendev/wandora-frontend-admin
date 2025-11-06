"use server";

import axios from "axios";

export const updateImg = async (listingId: string, imageUrl: string) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings/upload-image`, {
      listingId,
      imageUrl,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to update tour");
    }
    throw new Error("Failed to update tour");
  }
};

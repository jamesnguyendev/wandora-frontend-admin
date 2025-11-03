"use server";

import axios from "axios";

export const DeleteFollower = async (id: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/followers`, { data: { id } });
  } catch (error) {
    console.error("Error delete follower:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete follower");
    }
    throw new Error("Failed to delete follower");
  }
};

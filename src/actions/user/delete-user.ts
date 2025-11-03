"use server";

import axios from "axios";

export const DeleteUser = async (id: string) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users`, { data: { id } });
  } catch (error) {
    console.error("Error delete user:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to delete user");
    }
    throw new Error("Failed to delete user");
  }
};

import axios from "axios";

export interface AddFollowerPayload {
  id: number;
  masterId: number;
  password: string;
}

export const addFollower = async (payload: AddFollowerPayload) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/followers`, payload);
    return res.data;
  } catch (error) {
    console.error("Error adding follower:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to add follower");
    }
    throw new Error("Failed to add follower");
  }
};

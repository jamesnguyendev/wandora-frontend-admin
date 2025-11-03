import axios from "axios";

export interface AddUserPayload {
  name: string;
  email: string;
  phone: string;
}

export const addUser = async (payload: AddUserPayload) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, payload);
    return res.data;
  } catch (error) {
    console.error("Error adding users:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to add users");
    }
    throw new Error("Failed to add users");
  }
};

import axios from "axios";

export interface AddMasterPayload {
  id: number;
  masterId: number;
  profit: number;
}

export const addProfit = async (payload: AddMasterPayload) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/profits`, payload);
    return res.data;
  } catch (error) {
    console.error("Error adding profits:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message && "Failed to add profits");
    }
    throw new Error("Failed to add profits");
  }
};

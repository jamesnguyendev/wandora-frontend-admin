"use server";

import axios from "axios";

export async function refreshToken(accessToken: string): Promise<string> {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, { token: accessToken });

    return res.data.token;
  } catch (err) {
    console.error("Refresh token failed:", err);
    throw new Error("Refresh token failed");
  }
}

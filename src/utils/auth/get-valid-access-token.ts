import { jwtDecode } from "jwt-decode";
import { getServerSession } from "next-auth";

import { refreshToken } from "@/actions";
import { authOptions } from "@/lib/auth";
import { DecodedToken } from "@/types/auth";

export async function getValidAccessToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let accessToken = session.user.accessToken;

  const decoded = jwtDecode<DecodedToken>(accessToken);
  const now = Date.now() / 1000;

  if (!decoded || decoded.exp < now) {
    accessToken = await refreshToken(accessToken);
  }
  return accessToken;
}

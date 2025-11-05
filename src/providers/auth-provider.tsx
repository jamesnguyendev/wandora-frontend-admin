"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

import { DecodedToken } from "@/types/auth";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { data: session, update } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user.accessToken) {
      setLoading(false);
      return;
    }

    const checkToken = async () => {
      const token = session.user.accessToken;
      const decoded = jwtDecode<DecodedToken>(token);

      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.log("Token hết hạn, đang refresh...");
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            { token },
            { headers: { "Content-Type": "application/json" } },
          );
          console.log("đã call api");
          await update({ user: { ...session.user, accessToken: res.data.token } });
          console.log("Token đã được refresh và update");
        } catch (error) {
          console.error("Refresh token lỗi:", error);
          // signOut();
        }
      }

      setLoading(false);
    };

    checkToken();
  }, [session, update]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}

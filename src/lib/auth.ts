/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "@/actions";

interface AuthUser {
  id: string;
  email: string;
  role: "admin";
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const data = await login(credentials.email, credentials.password);

        if (data.userData.role !== "admin") {
          throw new Error("Access denied");
        }

        return {
          id: data.userData.id,
          email: data.userData.email,
          role: data.userData.role,
          token: data.token,
        } satisfies AuthUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

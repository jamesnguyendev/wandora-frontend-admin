import axios, { AxiosError } from "axios";

interface LoginResponse {
  token: string;
  userData: {
    id: string;
    email: string;
    name: string;
    role: string;
    verified: boolean;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Invalid email or password";
      throw new Error(message);
    }

    throw new Error("Something went wrong during login");
  }
}

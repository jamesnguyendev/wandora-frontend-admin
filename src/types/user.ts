export interface User {
  id: string;
  email: string;
  role: "guest" | "admin";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseUser {
  code: number;
  data: User[];
  message: string;
  status: string;
  timestamp: string;
}

export type UpdateUser = Omit<User, "createdAt" | "updatedAt">;

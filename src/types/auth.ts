export type DecodedToken = {
  exp: number;
  iat: number;
  userId?: string;
  role?: string;
};

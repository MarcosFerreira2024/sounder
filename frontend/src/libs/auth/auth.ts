import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://sounder-idh8.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});

export type Session = typeof authClient.$Infer.Session;

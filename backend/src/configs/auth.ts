import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import "dotenv/config";
import { Pool } from "pg";
import crypto from "node:crypto";

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET as string,
  baseURL: "https://sounder-sigma.vercel.app/api/auth",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    useSecureCookies: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["ADMIN", "USER"],
        defaultValue: "USER",
        input: false,
        required: false,
      },
      artist: { type: "json", input: false, required: false },
    },
  },

  plugins: [openAPI()],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      skipStateCookieCheck: true,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      skipStateCookieCheck: true,
    },
  },

  trustedOrigins: ["https://sounder-sigma.vercel.app", "http://localhost:5173"],
});

type Session = typeof auth.$Infer.Session;
export type { Session };

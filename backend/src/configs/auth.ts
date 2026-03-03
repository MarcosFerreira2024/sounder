import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import "dotenv/config";
import { Pool } from "pg";
import crypto from "node:crypto";

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET as string,
  baseURL: "https://sounder-idh8.vercel.app",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    useSecureCookies: true,

    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      path: "/",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ["ADMIN", "USER"],
        defaultValue: "USER",
        input: false,
        required: false,
      },

      artist: {
        type: "json",
        input: false,
        required: false,
      },
    },
  },

  plugins: [openAPI()],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  appName: "Sounder",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      account: {
        skipStateCookieCheck: true,
      },
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      account: {
        skipStateCookieCheck: true,
      },
    },
  },

  passwordReset: {
    redirectUrl: process.env.PASSWORD_RESET_REDIRECT_URL as string,
  },

  trustedOrigins: [
    "https://sounder-sigma.vercel.app", // frontend produção
    "http://localhost:5173", // frontend dev
  ],
});

type Session = typeof auth.$Infer.Session;
export type { Session };

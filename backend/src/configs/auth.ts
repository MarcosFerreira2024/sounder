import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "../libs/prismaClient";
import { openAPI } from "better-auth/plugins";
import "dotenv/config";

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET as string,
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),

  advanced: {
    database: {
      generateId: "uuid",
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
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  passwordReset: {
    redirectUrl: process.env.PASSWORD_RESET_REDIRECT_URL as string,
  },

  trustedOrigins: ["http://localhost:5173"],
});
type Session = typeof auth.$Infer.Session;
export type { Session };

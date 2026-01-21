import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { prisma } from "../libs/prismaClient";
import { openAPI } from "better-auth/plugins"

export const auth = betterAuth({
    secret: process.env.AUTH_SECRET as string,
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    

    }),

    advanced:{
        database:{
            generateId:"uuid",

        },
    },

    plugins: [ 
        openAPI(), 
    ] ,
    
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:false
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
    trustedOrigins:["http://localhost:5173"],
});

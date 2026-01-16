import { prismaAdapter } from "better-auth/adapters/prisma";
import {openAPI } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prisma } from "../libs/prismaClient";





export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
         
    }),
    
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:false
    },
    plugins: [
        openAPI({
            path:"/docs",
        }),

    ], 
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

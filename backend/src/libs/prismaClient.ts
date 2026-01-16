
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "../generated/prisma/client"


const adapter = new PrismaLibSql({
 url: "file:./db.db",
})
export const prisma = new PrismaClient({ adapter })
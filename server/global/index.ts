import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const POSTGRES_HOST = process.env.POSTGRES_HOST as string
export const POSTGRES_USER = process.env.POSTGRES_USER as string
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string
export const POSTGRES_DB = process.env.POSTGRES_DB as string

export const JWT_SECRET = process.env.JWT_SECRET as string
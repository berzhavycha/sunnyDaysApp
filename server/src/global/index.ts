import dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

dotenv.config({ path: "./.env" });

const configService = new ConfigService();

export const TYPEORM_TYPE = configService.get<string>("TYPEORM_TYPE");

export const POSTGRES_HOST = configService.get<string>("POSTGRES_HOST");
export const POSTGRES_USER = configService.get<string>("POSTGRES_USER");
export const POSTGRES_PASSWORD = configService.get<string>("POSTGRES_PASSWORD");
export const POSTGRES_DB = configService.get<string>("POSTGRES_DB");

export const JWT_ACCESS_SECRET = configService.get<string>("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET =
  configService.get<string>("JWT_REFRESH_SECRET");
export const JWT_ACCESS_TOKEN_TIME = configService.get<string>(
  "JWT_ACCESS_TOKEN_TIME",
);
export const JWT_REFRESH_TOKEN_TIME = configService.get<string>(
  "JWT_REFRESH_TOKEN_TIME",
);

export const REDIS_HOST = configService.get<string>("REDIS_HOST");
export const REDIS_PORT = configService.get<string>("REDIS_PORT");

export const LOGIN_FIELD = configService.get<string>("LOGIN_FIELD");

export const PORT = configService.get<string>("PORT");

import { config } from "dotenv";

config();

export const Env = {
	NODE_ENV: process.env.NODE_ENV || "",
	LISTEN_PORT: Number(process.env.LISTEN_PORT || "0"),
	DB_HOST: process.env.DB_HOST || "",
	DB_PORT: Number(process.env.DB_PORT || "0"),
	DB_NAME: process.env.DB_NAME || "",
	DB_USER: process.env.DB_USER || "",
	DB_PASS: process.env.DB_PASS || "",
	ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === "true",
	JWT_AT_SECRET: process.env.JWT_AT_SECRET || "",
	JWT_AT_EXPIRE_IN: Number(process.env.JWT_AT_EXPIRE_IN || "0"),
	APP_DOMAIN: process.env.APP_DOMAIN || "",
	FRONT_LOGIN_URI: process.env.FRONT_LOGIN_URI || "",
	FRONT_ADMIN_URI: process.env.FRONT_ADMIN_URI || "",
	FRONT_CHANGE_PASS_URI: process.env.FRONT_CHANGE_PASS_URI || "",
} as const;

console.log(Env);

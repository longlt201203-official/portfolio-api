import { Env } from "@utils";
import mongoose from "mongoose";

export async function initDbConnection() {
	return await mongoose.connect(`mongodb://${Env.DB_HOST}:${Env.DB_PORT}`, {
		user: Env.DB_USER,
		pass: Env.DB_PASS,
		dbName: Env.DB_NAME,
	});
}

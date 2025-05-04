import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IAccount {
	email: string;
	password: string;
}

export type AccountDocumentType = HydratedDocument<IAccount>;

export type AccountModelType = Model<IAccount, {}, {}, {}, AccountDocumentType>;

const AccountSchema = new Schema<IAccount, AccountModelType>({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export const AccountModel = mongoose.model<IAccount, AccountModelType>(
	"Account",
	AccountSchema,
);

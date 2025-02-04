import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IAccount {
	emails: string[];
	password: string;
	firstName: string;
	lastName: string;
	phoneNumbers: string[];
	addresses: string[];
}

export type AccountDocumentType = HydratedDocument<IAccount>;

export type AccountModelType = Model<IAccount, {}, {}, {}, AccountDocumentType>;

const AccountSchema = new Schema<IAccount, AccountModelType>({
	emails: {
		type: [String],
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNumbers: {
		type: [String],
		required: true,
	},
	addresses: {
		type: [String],
		required: true,
	},
});

export const AccountModel = mongoose.model<IAccount, AccountModelType>(
	"Account",
	AccountSchema,
);

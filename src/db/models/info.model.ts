import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IInfo {
	avt: string;
	name: string;
	introduction: string;
	email: string;
	phone: string;
	location: string;
	githubUsername: string;
	githubLink: string;
	linkedinName: string;
	linkedinLink: string;
	updatedAt: Date;
}

export type InfoDocumentType = HydratedDocument<IInfo>;

export type InfoModelType = Model<IInfo, {}, {}, {}, InfoDocumentType>;

const InfoSchema = new Schema<IInfo, InfoModelType>({
	avt: { type: String },
	name: { type: String },
	introduction: { type: String },
	email: { type: String },
	phone: { type: String },
	location: { type: String },
	githubUsername: { type: String },
	githubLink: { type: String },
	linkedinName: { type: String },
	linkedinLink: { type: String },
	updatedAt: { type: Date, default: () => new Date() },
});

export const InfoModel = mongoose.model<IInfo, InfoModelType>(
	"Info",
	InfoSchema,
);

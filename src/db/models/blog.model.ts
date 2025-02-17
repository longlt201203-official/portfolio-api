import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { CategoryDocumentType } from "./category.model";

export interface IBlog {
	language: string;
	title: string;
	shortDescription: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	isVisible: boolean;
	categories: CategoryDocumentType[];
}

export type BlogDocumentType = HydratedDocument<IBlog>;

export type BlogModelType = Model<IBlog, {}, {}, {}, BlogDocumentType>;

const BlogSchema = new Schema<IBlog, BlogModelType>({
	language: { type: String, required: true },
	title: { type: String, required: true },
	shortDescription: { type: String, required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, required: true, default: () => new Date() },
	updatedAt: { type: Date, required: true, default: () => new Date() },
	isVisible: { type: Boolean, required: true, default: false },
	categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

export const BlogModel = mongoose.model<IBlog, BlogModelType>(
	"Blog",
	BlogSchema,
);

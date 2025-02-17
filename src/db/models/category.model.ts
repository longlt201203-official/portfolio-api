import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface ICategory {
	language: string;
	name: string;
}

export type CategoryDocumentType = HydratedDocument<ICategory>;

export type CategoryModelType = Model<
	ICategory,
	{},
	{},
	{},
	CategoryDocumentType
>;

const CategorySchema = new Schema<ICategory, CategoryModelType>({
	name: { type: String, required: true },
	language: { type: String, required: true },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);

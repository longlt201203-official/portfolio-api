import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IProject {
	name: string;
	description: string;
	createdAt: Date;
	projectLink: string;
	isHidden: boolean;
	order: number;
}

export type ProjectDocumentType = HydratedDocument<IProject>;

export type ProjectModelType = Model<IProject, {}, {}, {}, ProjectDocumentType>;

const ProjectSchema = new Schema<IProject, ProjectModelType>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	projectLink: { type: String, required: true },
	isHidden: { type: Boolean, default: true },
	order: { type: Number, default: 0 },
});

export const ProjectModel = mongoose.model<IProject, ProjectModelType>(
	"Project",
	ProjectSchema,
);

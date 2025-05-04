import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IProject {
	name: string;
	description: string;
	createdAt: Date;
	projectLink: string;
}

export type ProjectDocumentType = HydratedDocument<IProject>;

export type ProjectModelType = Model<IProject, {}, {}, {}, ProjectDocumentType>;

const ProjectSchema = new Schema<IProject, ProjectModelType>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	projectLink: { type: String, required: true },
});

export const ProjectModel = mongoose.model<IProject, ProjectModelType>(
	"Project",
	ProjectSchema,
);

import { HydratedDocument } from "mongoose";

export interface IProject {
	name: string;
	description: string;
	createdAt: Date;
	projectLink: string;
}

export type ProjectDocumentType = HydratedDocument<IProject>;

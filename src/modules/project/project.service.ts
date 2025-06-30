import { Injectable } from "@nestjs/common";
import { CreateProjectRequest, UpdateProjectRequest } from "./dto";
import { ProjectModel } from "@db/models";
import { ProjectNotFoundError } from "./errors";

@Injectable()
export class ProjectService {
	async createOne(dto: CreateProjectRequest) {
		const project = new ProjectModel({
			name: dto.name,
			description: dto.description,
			projectLink: dto.projectLink,
			order: dto.order,
		});
		await project.save();
	}

	async updateOne(id: string, dto: UpdateProjectRequest) {
		const project = await this.findOne(id, true);
		project.name = dto.name;
		project.description = dto.description;
		project.projectLink = dto.projectLink;
		project.order = dto.order;
		await project.save();
	}

	async findMany() {
		return await ProjectModel.find().sort({ sort: -1, createdAt: -1 });
	}

	async findOne(id: string, fail: boolean = false) {
		const project = await ProjectModel.findById(id);
		if (fail && !project) {
			throw new ProjectNotFoundError();
		}
		return project;
	}

	async toggleVisibility(id: string) {
		const project = await this.findOne(id, true);
		project.isHidden = !project.isHidden;
		await project.save();
	}

	async deleteOne(id: string) {
		const project = await this.findOne(id, true);
		await ProjectModel.deleteOne({ _id: project._id });
	}
}

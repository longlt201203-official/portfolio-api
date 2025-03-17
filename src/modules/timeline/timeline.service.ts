import { Injectable } from "@nestjs/common";
import {
	CreateTimelineRequest,
	UpdateTimelineRequest,
	TimelineQuery,
} from "./dto";
import { TimelineModel } from "@db/models";
import { TimelineNotFoundError } from "./errors";

@Injectable()
export class TimelineService {
	async createOne(dto: CreateTimelineRequest) {
		const timeline = new TimelineModel(dto);
		return await timeline.save();
	}

	async updateOne(id: string, dto: UpdateTimelineRequest) {
		const timeline = await this.findOne(id);
		timeline.time = dto.time;
		timeline.title = dto.title;
		timeline.content = dto.content;
		timeline.sort = dto.sort;
		return await timeline.save();
	}

	async findMany(query: TimelineQuery) {
		return await TimelineModel.find({}).sort({ sort: -1, createdAt: -1 });
	}

	async findOne(id: string) {
		const timeline = await TimelineModel.findById(id);
		if (!timeline) throw new TimelineNotFoundError();
		return timeline;
	}

	async deleteOne(id: string) {
		const timeline = await this.findOne(id);
		await TimelineModel.deleteOne(timeline._id);
	}
}

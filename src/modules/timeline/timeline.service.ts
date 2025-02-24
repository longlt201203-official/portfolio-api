import { Injectable } from "@nestjs/common";
import {
	CreateTimelineRequest,
	UpdateTimelineRequest,
	TimelineQuery,
} from "./dto";

@Injectable()
export class TimelineService {
	async createOne(dto: CreateTimelineRequest) {}

	async updateOne(id: string | number, dto: UpdateTimelineRequest) {}

	async findMany(query: TimelineQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}

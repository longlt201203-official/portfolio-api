import { BlogModel } from "@db/models";
import { Injectable } from "@nestjs/common";
import { ListBlogsQuery } from "./dto";

@Injectable()
export class FrontApiService {
	async getListBlogs(query: ListBlogsQuery) {
		const limit = query.limit || 10;
		const page = query.page || 1;
		const count = await BlogModel.countDocuments();
		const data = await BlogModel.find(
			{ isVisible: true },
			{},
			{ limit: limit, skip: (page - 1) * limit },
		)
			.sort({
				updatedAt: -1,
			})
			.exec();
		return { data, count };
	}
}

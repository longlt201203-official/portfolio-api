import { BlogModel } from "@db/models";
import { Injectable } from "@nestjs/common";
import { ListBlogsQuery, ViewBlogQuery } from "./dto";
import { BlogNotFoundError } from "@modules/blog/errors";

@Injectable()
export class FrontApiService {
	async getListBlogs(query: ListBlogsQuery) {
		const limit = query.take || 10;
		const page = query.page || 1;
		const count = await BlogModel.countDocuments();
		const data = await BlogModel.find(
			{ isVisible: true },
			{ content: false },
			{ limit: limit, skip: (page - 1) * limit },
		)
			.sort({
				updatedAt: -1,
			})
			.exec();
		return { data, count };
	}

	async viewBlog(query: ViewBlogQuery) {
		const data = await BlogModel.findOne(
			{
				_id: query.blogId,
				isVisible: true,
			},
			{},
		);
		if (!data) throw new BlogNotFoundError();
		return data;
	}

	async getLandingPageBlogs() {
		return await BlogModel.find(
			{ isVisible: true },
			{ content: false },
			{ limit: 5 },
		)
			.sort({
				updatedAt: -1,
			})
			.exec();
	}

	async getLandingPageInfo() {
		const [blogs] = await Promise.all([this.getLandingPageBlogs()]);

		return { blogs };
	}
}

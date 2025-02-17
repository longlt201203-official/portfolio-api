import { Injectable } from "@nestjs/common";
import { CreateBlogRequest, UpdateBlogRequest, BlogQuery } from "./dto";
import { BlogModel } from "@db/models";
import { BlogNotFoundError } from "./errors";

@Injectable()
export class BlogService {
	async createOne(dto: CreateBlogRequest) {
		const blog = new BlogModel(dto);
		return await blog.save();
	}

	async updateOne(id: string, dto: UpdateBlogRequest) {
		const blog = await BlogModel.findByIdAndUpdate(id, dto, { new: true });
		if (!blog) throw new BlogNotFoundError();
		return await blog.save();
	}

	async findMany(query: BlogQuery) {
		return await BlogModel.find({}, { content: false }, {})
			.sort({ updatedAt: -1 })
			.exec();
	}

	async findOne(id: string) {
		return await BlogModel.findById(id);
	}

	async findOneOrFail(id: string) {
		const blog = await this.findOne(id);
		if (!blog) throw new BlogNotFoundError();
		return blog;
	}

	async toggleVisible(id: string) {
		const blog = await this.findOneOrFail(id);
		blog.isVisible = !blog.isVisible;
		return blog.save();
	}
}

import { Injectable } from "@nestjs/common";
import { CreateBlogRequest, UpdateBlogRequest, BlogQuery } from "./dto";

@Injectable()
export class BlogService {
	async createOne(dto: CreateBlogRequest) {}

	async updateOne(id: string | number, dto: UpdateBlogRequest) {}

	async findMany(query: BlogQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}

import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";

@Module({
	providers: [BlogService],
	exports: [BlogService],
	controllers: [BlogController],
})
export class BlogModule {}

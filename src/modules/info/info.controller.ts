import {
	Controller,
	Body,
	Get,
	Put,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
} from "@nestjs/common";
import { InfoService } from "./info.service";
import { InfoResponse, UpdateInfoAvtRequest, UpdateInfoRequest } from "./dto";
import { ApiResponseDto } from "@utils";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("info")
export class InfoController {
	constructor(private readonly infoService: InfoService) {}

	@Put("avt")
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: UpdateInfoAvtRequest })
	@UseInterceptors(FileInterceptor("file"))
	async updateAvt(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({ fileType: "image/*" }),
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
				],
			}),
		)
		file: Express.Multer.File,
	) {
		await this.infoService.updateAvt(file);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Put()
	async updateOne(
		@Body()
		dto: UpdateInfoRequest,
	) {
		await this.infoService.updateOne(dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findOne() {
		const data = await this.infoService.findOne();
		return new ApiResponseDto(
			InfoResponse.fromDocument(data),
			null,
			"Get info successfully",
		);
	}
}

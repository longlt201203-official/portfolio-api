import { Injectable, OnModuleInit } from "@nestjs/common";
import { UpdateInfoRequest } from "./dto";
import { InfoModel } from "@db/models";
import { Env, getS3Filepath, s3Client } from "@utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class InfoService implements OnModuleInit {
	async onModuleInit() {
		// Create default info if not exists
		let info = await InfoModel.findOne();
		if (!info) {
			info = new InfoModel({
				name: "",
				avt: "",
				introduction: "",
				email: "",
				phone: "",
				location: "",
				githubUsername: "",
				githubLink: "",
				linkedinName: "",
				linkedinLink: "",
			});
			await info.save();
		}
	}

	async updateAvt(file: Express.Multer.File) {
		const info = await this.findOne();
		const command = new PutObjectCommand({
			Bucket: Env.S3_BUCKET,
			Key: file.originalname,
			Body: file.buffer,
			ContentType: file.mimetype,
			ContentLength: file.size,
		});
		await s3Client.send(command);
		info.avt = getS3Filepath(file.originalname);
		await info.save();
	}

	async updateOne(dto: UpdateInfoRequest) {
		const info = await this.findOne();
		info.name = dto.name;
		info.introduction = dto.introduction;
		info.email = dto.email;
		info.phone = dto.phone;
		info.location = dto.location;
		info.githubUsername = dto.githubUsername;
		info.githubLink = dto.githubLink;
		info.linkedinName = dto.linkedinName;
		info.linkedinLink = dto.linkedinLink;
		info.updatedAt = new Date();

		await info.save();
	}

	async findOne() {
		return await InfoModel.findOne();
	}
}

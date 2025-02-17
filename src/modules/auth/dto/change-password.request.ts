import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordRequest {
	@ApiProperty()
	@IsString()
	currentPassword: string;

	@ApiProperty()
	@IsString()
	newPassword: string;
}

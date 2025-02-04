import { ApiProperty } from "@nestjs/swagger";
import { LoginTypeEnum } from "../enums";

export class LoginQuery {
	@ApiProperty()
	code: string;

	@ApiProperty({ enum: LoginTypeEnum })
	type: string;
}

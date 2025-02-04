import { ApiProperty } from "@nestjs/swagger";

export class TokenResponse {
	@ApiProperty()
	accessToken: string;

	@ApiProperty()
	expiresAt: number;

	@ApiProperty()
	isFirstLogin: boolean;
}

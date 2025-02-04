import { Module, OnModuleInit } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
	providers: [AuthService],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule implements OnModuleInit {
	constructor(private readonly authService: AuthService) {}

	async onModuleInit() {
		const firstLoginToken = await this.authService.generateFirstLoginToken();
		console.log(`First login token: ${firstLoginToken}`);
	}
}

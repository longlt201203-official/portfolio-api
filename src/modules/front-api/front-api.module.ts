import { Module } from "@nestjs/common";
import { FrontApiService } from "./front-api.service";
import { FrontApiController } from "./front-api.controller";

@Module({
	providers: [FrontApiService],
	exports: [FrontApiService],
	controllers: [FrontApiController],
})
export class FrontApiModule {}

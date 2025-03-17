import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { AuthGuard, AuthModule } from "@modules/auth";
import { BlogModule } from "@modules/blog";
import { ClsModule } from "nestjs-cls";
import { AccountModule } from "@modules/account";
import { FrontApiModule } from "@modules/front-api";
import { TimelineModule } from "@modules/timeline";
import { InfoModule } from "@modules/info";

@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
			},
		}),
		AuthModule,
		BlogModule,
		AccountModule,
		TimelineModule,
		InfoModule,
		FrontApiModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}

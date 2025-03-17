import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { initDbConnection } from "@db";
import * as cookieParser from "cookie-parser";
import * as fs from "fs";

async function bootstrap() {
	await initDbConnection();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors({ origin: "*" });
	app.use(helmet());
	app.use(cookieParser());

	if (Env.ENABLE_SWAGGER) {
		const config = new DocumentBuilder()
			.setTitle("API Documentation")
			.setDescription("API Description")
			.setVersion("1.0")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("api/docs", app, document);
		fs.writeFileSync("swagger.json", JSON.stringify(document, null, 2));
	}

	await app.listen(Env.LISTEN_PORT);
}
bootstrap();

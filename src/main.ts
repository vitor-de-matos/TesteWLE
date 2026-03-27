import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import {
  SWAGGER_CONFIG,
  SWAGGER_CUSTOM_OPTIONS,
} from "./shared/config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>("port");
  const production = configService.get<string>("production");

  if (production === "false") {
    const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
    SwaggerModule.setup("api", app, document, SWAGGER_CUSTOM_OPTIONS);
  }

  app.enableShutdownHooks();

  await app.listen(port ?? 3000);
  console.log(`App runing on http://localhost:${port}/api`);
}
bootstrap();

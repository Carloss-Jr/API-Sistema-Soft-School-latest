import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Nest.js API Soft School')
    .setDescription('Documentacao da API ')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, () =>
    console.log(process.env.PORT),
  );
}
bootstrap();

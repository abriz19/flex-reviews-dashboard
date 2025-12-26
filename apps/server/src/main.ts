import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Flex Living API')
    .setDescription('Flex Living API description')
    .setVersion('1.0')
    .addTag('Flex Living')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT ?? 5000;
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();

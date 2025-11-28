import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.DISABLE_NEST_LOGS === 'true' ? false : new Logger(),
  });

  // Remove CSP headers
  app.use((req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.removeHeader('Content-Security-Policy');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.removeHeader('X-Content-Security-Policy');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.removeHeader('X-WebKit-CSP');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  // adding cors
  app.enableCors({
    origin: true,
  });

  app.setGlobalPrefix('api'); // global API prefix

  // added class validator global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // added swagger api documentation configurations
  const config = new DocumentBuilder()
    .setTitle('Ilmi Book House')
    .setDescription('The Carier Service API Documentation.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customCss: `
    /* Custom CSS to handle missing styles */
    .swagger-ui .info hgroup.main h2 { color: #333; }
  `,
    customSiteTitle: 'API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }); // Swagger UI at /swagger

  // started the application server
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();

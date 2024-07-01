import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './filters/error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle(
      'DIN-DIN.v2 - A RESTful API for Managing Bank Accounts and Payments',
    )
    .setDescription(
      'The API, developed with NestJS, aims to provide an efficient system for managing bank accounts and payments. It leverages the Prisma ORM for seamless database interactions, Docker for hassle-free development and deployment, and GitHub Actions for continuous integration and delivery. The project adheres to best practices such as Domain-Driven Design (DDD) and Test-Driven Development (TDD), ensuring a robust and scalable application. Key features include user authentication, account creation and management, and payment transactions. It supports various account types and allows for detailed transaction filtering. Designed for scalability, it offers a comprehensive solution for financial management with a focus on usability and security.',
    )
    .setVersion('1.0')
    .setContact(
      'Walter Netto',
      'https://github.com/walttinho',
      'walter.netto@live.com',
    )
    .addBearerAuth()
    .addTag('User')
    .addTag('Auth')
    .addTag('Account')
    .addTag('Payment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const documentationPath = path.resolve(__dirname, '..', 'documentation');
  app.use('/documentation', express.static(documentationPath));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

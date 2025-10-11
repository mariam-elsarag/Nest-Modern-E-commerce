import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { GlobalExceptionsFilter } from './common/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // to return error the way i want
  app.useGlobalFilters(new GlobalExceptionsFilter());
  // for validator

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const errors: Record<string, string> = {};

        const extractErrors = (errs: any[], parentPath = '') => {
          for (const err of errs) {
            const path = parentPath
              ? `${parentPath}.${err.property}`
              : err.property;

            if (err.constraints) {
              // ✅ Type-safe casting here
              const messages = Object.values(err.constraints) as string[];
              errors[path] = messages[0];
            }

            // ✅ Handle nested (variant.0.sku, etc.)
            if (err.children && err.children.length > 0) {
              extractErrors(err.children, path);
            }
          }
        };

        extractErrors(validationErrors);

        const firstMessage = Object.values(errors)[0] || 'Validation failed';

        return new BadRequestException({
          statusCode: 400,
          message: firstMessage,
          errors,
        });
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  app.use(helmet());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

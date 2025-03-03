import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule  } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Permite solicitudes solo desde este origen
  }); 

   // Habilita validaciones automáticas en los DTOs
   app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades desconocidas
    transform: true, // Transforma los datos al tipo definido en el DTO
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tareas')  // Cambia el título según tu proyecto
    .setDescription('Documentación de la API de tareas con NestJS y Swagger')
    .setVersion('1.0')
    .addBearerAuth()  // Para autenticación con JWT si la usas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // URL de Swagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

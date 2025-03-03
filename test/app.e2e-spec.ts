import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Task API (e2e)', () => {
  let app: INestApplication;
  let createdTaskId: number;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Obtener todas las tareas
  it('GET /tasks should return an array of tasks', async () => {
    const response = await request(app.getHttpServer()).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // 2. Obtener todas las tareas por ID de usuario
  it('GET /tasks/user/:id should return an array of tasks for a user', async () => {
    const response = await request(app.getHttpServer()).get('/tasks/user/1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // 3. Crear una tarea
  it('POST /tasks should create a new task', async () => {
    const taskData = { title: 'Nueva tarea', description: 'Descripción', userId: 1 };
    
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTaskId = response.body.id;
  });

  // 4. Obtener tarea por ID
  it('GET /tasks/:id should return a task', async () => {
    const response = await request(app.getHttpServer()).get(`/tasks/${createdTaskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTaskId);
  });

  // 5. Actualizar una tarea
  it('PUT /tasks/:id should update a task', async () => {
    const updatedTaskData = { title: 'Tarea actualizada', description: 'Nueva descripción' };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTaskId}`)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTaskData.title);
  });

  // 6. Eliminar una tarea
  it('DELETE /tasks/:id should delete a task', async () => {
    const response = await request(app.getHttpServer()).delete(`/tasks/${createdTaskId}`);
    expect(response.status).toBe(200);

    // Verificar que la tarea ha sido eliminada
    const getResponse = await request(app.getHttpServer()).get(`/tasks/${createdTaskId}`);
    expect(getResponse.status).toBe(404);
  });
});
